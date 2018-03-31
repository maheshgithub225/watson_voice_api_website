import React from 'react';
import AboveMain from '../AboveMain/AboveMain';
import './MainContent.css'
import './paper-kit.css'
import 'font-awesome/css/font-awesome.min.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
var stream = '';
class MainContent extends React.Component {
     constructor(props) {
        console.log('props', props);
      super(props)
    this.state = {
      div: '',
      div1:'',
      hideall: true,
      isReady: false,
      isOpen: true,
      count: 0,
      instruction: 'Start Recording'
    }
    }

    startRecording = (param) => {

    fetch('http://localhost:3002/api/speech-to-text/token')
     .then(function(response)  {
       return response.text();
      }).then( (token) => {
     stream = recognizeMic({
        token: token,
        objectMode: true, // send objects instead of text
        extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        format: false // optional - performs basic formatting on the results such as capitals an periods
    });

      if(this.state.hideall){
        this.setState({label: 'Coding Challenge #3 Survey'});
        this.setState({command: "Say 'Ready' to get started or Say 'About' to know about CC #3"});
        {this.init()}
      }
      stream.on('data', (data) => {
      this.setState({
        text: data.alternatives[0].transcript,
      })

      var txt = JSON.stringify(this.state.text);
      if(txt.includes("Ready") || txt.includes("ready")){
        {this.bottom()}
        {this.firstquestion()}
        this.setState({text: ''});
      }
      console.log('param', param);
      if(param === 'namebegin'){
        document.getElementById('nickname').text = this.state.text;
      }

      if(this.state.div === 'question2'){
        if(txt.includes("Yes") || txt.includes("yes")) {
          document.getElementById('yes').checked = true;
          this.setState({div1:'question2'});
        } else if(txt.includes("No") || txt.includes("no")) {
          document.getElementById('no').checked = true;
          this.setState({div1:'question2'});
        }
      }else if(this.state.div === 'question3'){
        if(txt.includes("Finish") || txt.includes("finish") || txt.includes("one")){
            this.setState({label:'Thank You'});
            {this.top()}
            document.getElementById('rating').style.display = 'none';
          }
        }
     
      if(txt.includes("About") || txt.includes("about") && this.state.isOpen){
        window.open("https://github.com/zero-to-mastery/Coding_Challenge-3");
        this.setState({isOpen:false});
      }
    
     if(this.state.isReady){
      if(txt.includes("down") || txt.includes("Down") || txt.includes("Scroll Down") || txt.includes("scroll down") || txt.includes("Bottom") || txt.includes("bottom")){
        {this.bottom()}
      }else if(txt.includes("top") || txt.includes("Top") || txt.includes("Scroll Top") || txt.includes("scroll top")){
        {this.top()}
      }else if(txt.includes("Next") || txt.includes("next") || txt.includes("ext")){
        if(this.state.div1 === ''){
          {this.secondquestion()}
        }

        if(this.state.div1 === 'question2'){
          {this.thirdquestion()}
        }
      }
    }else if (txt.includes("Creative") || txt.includes("creative")){
          window.open("https://www.creative-tim.com/")
      } else if (txt.includes("Blog") || txt.includes("blog")){
         window.open("https://blog.creative-tim.com/")
      } else if (txt.includes("License") || txt.includes("license")){
         window.open("https://www.creative-tim.com/license")
      } 
    });

    stream.on('error', function(err) {
       
    });
  }).catch(function(error) {
          
  });
  }

  stopRecording = () => {
    if(stream !== '')
    {
      stream.stop();
    }
  }
  

  init() {
  document.getElementById('name').style.display = 'none';
  document.getElementById('challenge').style.display = 'none';
  document.getElementById('rating').style.display = 'none';
  this.setState({hideall:'false'});
  this.setState({isReady:'true'});
  this.setState({txt: ''});
  {this.top()}
  }

  bottom() {
    var body = document.body; 
    var html = document.documentElement; 
    body.scrollTop += 500;
    html.scrollTop += 500;
  }
  top() {
    var body = document.body; 
    var html = document.documentElement; 
    body.scrollTop -= 500;
    html.scrollTop -= 500;
  }

  question = (num) => {
    if(num == 1){

    }
  }

  firstquestion() {
    document.getElementById('name').style.display = 'block';
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('rating').style.display = 'none';
    this.setState({div: 'question2'});
   
  }
  secondquestion() {
    document.getElementById('name').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    document.getElementById('rating').style.display = 'none';
    this.setState({div:'question2'});
  }

  thirdquestion(){
    document.getElementById('name').style.display = 'none';
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('rating').style.display = 'block';
    this.setState({div:'question3'});
  }

   render(){
    return(<div> 
        </div>
        );
   }
}

export default MainContent;