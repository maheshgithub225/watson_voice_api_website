import React from 'react';

const Head = () => {

return(

    <nav className="navbar navbar-expand-md fixed-top navbar-transparent" color-on-scroll="500">
    <link href="https://rawgit.com/ellekasai/twemoji-awesome/gh-pages/twemoji-awesome.css" rel="stylesheet"/>
        <div className="container">
            <div  className="navbar-translate">
                <button id = "about" className="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar"></span>
                    <span className="navbar-toggler-bar"></span>
                    <span className="navbar-toggler-bar"></span>
                </button>
                <a className="navbar-brand" href={"https://github.com/zero-to-mastery/Coding_Challenge-3"}>About CC #3</a>
            </div>
        </div>
    </nav>
    );
}

export default Head;

