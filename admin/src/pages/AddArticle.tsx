import React, {useState} from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';

const {Option} = Select;
const {TextArea} = Input;

export function AddArticle(){
  return (
    <div>
      <h1>添加文章</h1>
    </div>
  )
}