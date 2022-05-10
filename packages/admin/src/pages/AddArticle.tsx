import React, { useState, useEffect } from "react";
import { marked, Renderer } from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

interface TypeInfo {
  typeName: String;
  id: number;
  orderNum: number;
  icon: String;
}

export function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [  introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(""); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState<TypeInfo[]>([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(""); //选择的文章类别

  const navigate = useNavigate();

  const renderer = new Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true, // github 样式差不多的md 展示
    pedantic: false,
    sanitize: false, // 允许html标签
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    const html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    const html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const handleTitleChange = (e) => {
    setArticleTitle(e.target.value);
  };

  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    })
      .then((res) => {
        const data = res.data.data;
        if (data == "没有登录") {
          navigate("/");
          localStorage.removeItem("openId");
        } else {
          setTypeInfo(res.data.data);
        }
      })
      .catch((err) => {
        message.error("获取文章类别信息失败");
      });
  };

  const {id} = useParams();

  useEffect(() => {
    getTypeInfo();
    // 获取文章ID
    if (id) {
      setArticleId(Number(id));
      getArticleById(id);
    }
  }, []);

  const saveArticle = () => {
    if (!selectedType) {
      message.error("请选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("请填写文章标题");
      return false;
    } else if (!articleContent) {
      message.error("请填写文章内容");
      return false;
    } else if (!introducemd) {
      message.error("请填写简介");
      return false;
    } else if (!showDate) {
      message.error("请选择发布日期");
      return false;
    }

    const dataProps = {};
    dataProps["title"] = articleTitle;
    dataProps["article_content"] = articleContent;
    dataProps["introduce"] = introducemd;
    dataProps["type_id"] = selectedType;
    const dateText = showDate.replace("-", "/");
    dataProps["addTime"] = new Date(dateText).getTime() / 1000;

    // 意味着文章是新增的
    if (articleId === 0) {
      dataProps["view_count"] = 0;
      axios({
        method: "post",
        url: servicePath.addArticle,
        withCredentials: true,
        data: dataProps,
      })
        .then((res) => {
          if (res.data.isSuccess) {
            message.success("文章发布成功");
            setArticleId(res.data.insertId);
          } else {
            message.error("文章发布失败");
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
      // 不等于0 为修改的文章
      dataProps["id"] = articleId;
      axios({
        method: "post",
        data: dataProps,
        url: servicePath.updateArticle,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.isSuccess) {
            message.success("文章修改成功");
          } else {
            message.error("文章修改失败");
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
  };

  const getArticleById = (id) => {
    axios({
      method: "get",
      url: servicePath.getArticleById + id,
      withCredentials: true,
    })
      .then((res) => {
        const data = res.data.data[0];
        console.log('data:', data);
        setArticleId(data.id);
        setArticleTitle(data.title);
        setArticleContent(data.article_content);
        setIntroducemd(data.introduce);
        setShowDate(data.addTime);
        setSelectType(data.type_id);
        const html = marked(data.article_content);
        setMarkdownContent(html);
        const html2 = marked(data.introduce);
        setIntroducehtml(html2);
      })
      .catch((err) => {
        message.error("获取文章信息失败");
      });
  }

  return (
    <div>
      {/* gutter 间距 */}
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                onChange={handleTitleChange}
                value={articleTitle}
              />
              &nbsp;
            </Col>
            <Col span={4}>
              <Select
                defaultValue={selectedType || "选择文章类别"}
                size="large"
                onChange={(value, option) => {
                  setSelectType(value);
                }}
              >
                {typeInfo.map((item: TypeInfo, index) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button size="large" type="primary" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章摘要"
                onChange={changeIntroduce}
                value={introducemd}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(dateType, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
