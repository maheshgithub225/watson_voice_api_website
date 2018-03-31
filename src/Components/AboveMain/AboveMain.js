import React from 'react';
import './paper-kit.css'
import './AboveMain.css'

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
var stream = '';
let final_text = '';
let answer2 = '';
let answer3 = '';
class AboveMain extends React.Component{
	constructor(props){
		super(props)
		this.state = {
      div: 'question1',
      div1:'',
      label:'Coding Challenge #3 Survey',
      hideall: true,
      command: "Say 'Ready' to get started or Say 'About' to know about CC #3",
      isReady: true,
      isOpen: true,
      instruction: 'Start Recording',
      speech: '',
      unicode: '',
      class: '',
      feedback: ''
    }
	}

	startRecording = () =>{
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
    stream.on('data', (data) => {
          this.setState({text: data.alternatives[0].transcript})

      var txt = JSON.stringify(this.state.text);
      if(this.state.div === 'question1'){
      if(txt.includes("Ready") || txt.includes("ready")){
        {this.bottom()}
        {this.firstquestion()}
        this.setState({text: ''});
      }
    }

      if(this.state.div === 'question2'){
        if(txt.includes("Yes") || txt.includes("yes")) {
          document.getElementById('yes').checked = true;
          document.getElementById('q2next').style.display = 'block'
          answer2 = 'I will let Andrei know that you enjoyed it.';
          this.setState({div1:'question2'});
        } 

        if(txt.includes("No") || txt.includes("no")) {
          document.getElementById('no').checked = true;
          document.getElementById('q2next').style.display = 'block'
          answer2 = 'I will let Andrei know that you had tough time, we will work on improving it';
          this.setState({div1:'question2'});
        }
      }else if(this.state.div === 'question3'){

        if(txt.includes("Wow") || txt.includes("wow")){ 
          this.setState({classwow: 'wowSelected'}); this.setState({classgood:''}); this.setState({classfine:''}); this.setState({classbad:''});
          answer3 = 'Hurray! I am happy that you loved my website';
        }else if(txt.includes("Good") || txt.includes("good")){
         this.setState({classwow: ''}); this.setState({classgood:'goodSelected'}); this.setState({classfine:''}); this.setState({classbad:''});
          answer3 = 'Yippyy! I am happy to know that you like my website';
        }else if(txt.includes("fine") || txt.includes("Fine")){
         this.setState({classwow: ''}); this.setState({classgood:''}); this.setState({classfine:'fineSelected'}); this.setState({classbad:''});
         answer3 = 'I will get better next time';
        }else if(txt.includes("Bad") || txt.includes("bad")){
        this.setState({classwow: ''}); this.setState({classgood:''}); this.setState({classfine:''}); this.setState({classbad:'badSelected'});
        answer3 = 'Sorry to dissapoint, I will improve in the next challenge';
        }

        if(txt.includes("Done") || txt.includes("done") || txt.includes("one")){
          let label_done = 'Thank You' + " "+final_text;
            this.setState({label:label_done});
            let command_done = answer2;
            this.setState({command:command_done});
            let rating_done = answer3;
            this.setState({feedback: rating_done});
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
    document.querySelector('#stopbtn').onclick = () => {
     
       final_text = this.state.text;
          final_text = final_text.replace(/,/g, " ");
          final_text = final_text.replace(/%HESITATION/g, " ");
           this.setState({text: '', final_text: final_text});
           console.log('final', final_text);
           document.querySelector("#input_result").defaultValue = final_text;
           document.getElementById('startbtn').style.display = 'block';
            document.getElementById('stopbtn').style.display = 'none';
            document.getElementById('startinst').style.display = 'block';
            document.getElementById('stopinst').style.display = 'none';
            document.getElementById('q1next').style.display = 'block';
    }

  }).catch(function(error) {
          
  });
  }

  startbtnClick = () => {
    document.getElementById('startbtn').style.display = 'none';
    document.getElementById('stopbtn').style.display = 'block';
    document.getElementById('startinst').style.display = 'none';
    document.getElementById('stopinst').style.display = 'block';
    document.getElementById('q1next').style.display = 'none';
    {this.startRecording()}
  }

  init() {
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
  clearname = () =>{
    this.setState({
    text: '',
    final_text: ''
    })
  }
  firstquestion =() => {
    document.getElementById('name').style.display = 'block';
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('rating').style.display = 'none';
    this.setState({div: 'question1'});
   
  }
  secondquestion =() => {
    document.getElementById('name').style.display = 'none';
    document.getElementById('challenge').style.display = 'block';
    document.getElementById('rating').style.display = 'none';
    this.setState({div:'question2'});
  }

  thirdquestion =() =>{
    document.getElementById('name').style.display = 'none';
    document.getElementById('challenge').style.display = 'none';
    document.getElementById('rating').style.display = 'block';
    this.setState({div:'question3'});
  }

   render(){
    return(
  <div className="wrapper">
  <div className="page-header section-dark background-image">
  <div className="filter">

    </div>
    <div className="content-center">
      <div className="container">
        <div className="title-brand">
          <h2 className="presentation-title">{this.state.label}</h2>
          <div className="fog-low">
            <img src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png" alt=""/>
          </div>
          <div className="fog-low right">
            <img src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png" alt=""/>
          </div>
        </div>

        <h2 className="presentation-subtitle text-center">{this.state.command}</h2>
        <h2 className="presentation-subtitle text-center">{this.state.feedback}</h2>
      </div>
    </div>
    <div className="moving-clouds" styles="background-image: url('https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/clouds.png')">

    </div>
    </div>

      <div className="main" >
          <div className="section text-center">
                <div id="name" align= "center"> 
                <div className="progress" >
                  <div className="progress-bar progress-bar-success Question1"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" role="progressbar"></div>
                </div><br/>
                <h4 className= "fontstyle">Enter your nickname</h4>
                 <h6 id="stopinst" className= "fontstyle danger">(Click on <i className="fa">&#9724;</i> to stop recording)</h6> 
                 <h6 id="startinst" className= "fontstyle">(Click on <i className="fa fa-microphone"></i> to start recording)</h6> 
                <br/>
                <div align="center">
                  <div className="col-sm-6">
                    <div className="form-group  ">
                        <table>
                        <td>
                        <input  id = 'input_result' type="text" className="form-control" placeholder="Say your Nickname" value={this.state.final_text} />
                        </td> 
                        <td className= "microphone"> </td>
                        <button  id="startbtn"  className="btn btn-success btn-just-icon" onClick = {this.startbtnClick}><i className="fa fa-microphone" ></i></button>
                        <button  id="stopbtn"  className="btn btn-danger btn-just-icon"><i className="fa fa-stop" ></i></button>
                        <td className= "microphone"> </td>
                        <button type="button" id="micbtn"  className="btn btn-success btn-just-icon" onClick = {this.clearname}><i className="fa">&#x21bb;</i></button>
                        </table>
                        <br/>
                    </div>

                  </div> 
                  <button id="q1next" className="btn btn-info btn-round" onClick = {this.secondquestion}>Say 'Next' <i className="fa">&#x2192;</i></button>
                </div>
            </div>


            <div id="challenge" align="center">
            <div className="progress">
                <div className="progress-bar progress-bar-success Question2" role="progressbar"></div>
            </div>
                 <br/> 
              <h4 className= "fontstyle">Did you have fun doing the challenge?</h4>
               <h6 id="yesno" className= "fontstyle">(Say 'Yes' or 'No')</h6>
              <br/>
              <div className="col-sm-3">
               <div className="form-group">
                 <div>
                 <table>
                 <td>
                  <input id = "yes" type="radio" value="YES" name="gender"/> Yes
                  </td>
                  <td>
                 <input id = "no" type="radio" value="NO" name="gender"/> No
                 </td>
                 <td className= "microphone"> </td>
                        <button type="button" id="q2clearbtn"  className="btn btn-success btn-just-icon" onClick = {this.clearname}><i className="fa">&#x21bb;</i></button>
                        </table>
                </div>
                <br/>
              </div>
            </div>
            <button id = "q2next" className="btn btn-info btn-round">Say 'Next'  <i className="fa">&#x2192;</i></button>
          </div>


          <div id="rating" align="center"> 
          <div className="progress">
             <div className="progress-bar progress-bar-success Question3" role="progressbar"></div>
          </div><br/>
             <h4 className= "fontstyle">How do you feel about this website?</h4>
             <h6 id="yesno" className= "fontstyle">(Say the word below each item to share your feeling)</h6>
          <br/>
               <td id = "wow" className = "space"><tr> <i className="twa twa-heart"></i></tr> <tr className = {this.state.classwow}>Wow</tr></td> 
               <td id = "good" className = "space"> <tr>  <i className="twa twa-smiley"></i></tr > <tr className = {this.state.classgood}>Good</tr></td>
               <td id = "fine" className ="space"> <tr>  <i className="twa twa-thumbsup"></i></tr> <tr className = {this.state.classfine}>Fine</tr></td>
               <td id = "bad" className = "space"> <tr>  <i className="twa twa-disappointed"></i></tr> <tr className = {this.state.classbad}>Bad</tr></td>
                  
            <br/>
            <button id="div3done" className="btn btn-info btn-round">Say 'Done'</button>
          </div>

          <script type="text/javascript" src="src/watson-speech.min.js"></script>

        </div>
        </div>
        </div>
    );
  }
}

export default AboveMain;

