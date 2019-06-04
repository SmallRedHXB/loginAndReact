import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    // Select,
    // Row,
    // Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  import 'antd/dist/antd.css';
  import React from 'react'
  import './registerComp.css'
  import axios from 'axios'
  
  // const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      email: '', 
      password: '', 
      username: '', 
      residence: '', 
      website: ''
    };

    submitH = () =>{
      if(!this.state.email || !this.state.password || !this.state.username || !this.state.residence || !this.state.website){
        return
      }
      let data = {email: this.state.email, password: this.state.password, username: this.state.username, residence: this.state.residence, website: this.state.website}
      let url = 'http://192.168.21.33:8001/fapp/user/register/'
      axios.post(url, data, {headers: {'Content-Type': 'application/json'}}
        ).then(res=>{
          if(res.status === 200 && res.data.code===1){
              alert('注册成功。'+res)
              this.props.history.push('/login')
          }
          else{
              console.log(res)
              alert('注册失败：' + res.data.msg)
          }

      })
    }

    handleEmail = (e) =>{
      this.setState({
        email: e.target.value
      })
    }
    handlePassword = (e) =>{
      this.setState({
        email: e.target.value
      })
    }
    handleUsername = (e) =>{
      this.setState({
        email: e.target.value
      })
    }
    handleResidence = (e) =>{
      this.setState({
        email: e.target.value
      })
    }
    handleWebsite = (e) =>{
      this.setState({
        email: e.target.value
      })
    }

  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      this.submitH();     
    };
  
    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      // const prefixSelector = getFieldDecorator('prefix', {
      //   initialValue: '86',
      // })(
      //   <Select style={{ width: 70 }}>
      //     <Option value="86">+86</Option>
      //     <Option value="87">+87</Option>
      //   </Select>,
      // );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        // <div className='loginRegister'>注册</div>
        <div className='registerDiv'>
            <div className='redisterTitle'>注册</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input onChange={this.handleEmail} />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password  onChange={this.handlePassword} />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Habitual Residence">
            {getFieldDecorator('residence', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu'],
              rules: [
                { type: 'array', required: true, message: 'Please select your habitual residence!' },
              ],
            })(<Cascader options={residences}  onChange={this.handleUsername} />)}
          </Form.Item>
          {/* <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item> */}
          <Form.Item label="Website">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input  onChange={this.handleWebsite} />
              </AutoComplete>,
            )}
          </Form.Item>
          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the <a href="http://www.baidu.com">agreement</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="primary1" className='toLogin'>
              <a href='/login'>
              返回登录
              </a>
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
  export default WrappedRegistrationForm;