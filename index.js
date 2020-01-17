const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require("html-pdf");
const fs = require('fs');
//const generateHTML = require(".generateHTML")

 
inquirer
    .prompt ([
        {
            type: "input",
            message: "What is your username on Github?",
            name: "username"
    },
    {
        type: "input",
        message: "What is your favorite color?",
        name: "colorPref"
    
}]  )
.then(replies => {
    console.log (replies)
    const username = replies.username;
    const colorPref = replies.colorPref;
    //const colorPref = replies.color;

    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(res => {
       let userInfo = {
           name: res.data.name,
           color: replies.color,
           username: replies.github,
           bio: res.data.bio,
           image: res.data.avatar_url,
           location: res.data.location,
           github: res.data.html_url,
           repos: res.data.public_repos,
           followers: res.data.followers,
           following: res.data.following,
           blog: res.data.blog,
           stars: res.data.starred
       };

       let starCount;

       const starUrl = `https://api.github.com/users/${username}/starred`;
       axios.get(starUrl).then(res => {
        //  let starCount = {
        //    stars: res.data.starred
        //  }
        //  console.log(starCount)
        //  console.log(res.data)
         const starz = res.data.length
        //  console.log(res.data.length)

         console.log(colorPref, "colorPref")

          const html = `<html>
          <body style = "background-color: ${colorPref}">
          <img class = "center"
          src =  "${userInfo.image}">
          <p> Name: ${userInfo.name}</p>
          <p> bio: ${userInfo.bio}</p>
          <p> location: ${userInfo.location} </p>
          <p> github: ${userInfo.github}</p>
          <p> repos: ${userInfo.repos}</p>
          <p> followers: ${userInfo.followers} </p>
          <p> following: ${userInfo.following} </p>
          <p> blog: ${userInfo.blog} </p>
          <p> stars: ${starz} </p>
          </body>

          </html>`

          const options = {
            "orientation": "portrait",
            "type": "pdf"

            
        }

        const colors = {
          purple: {
            wrapperBackground: "#C523EB",
            headerBackground: "#C523EB",
            headerColor: "black",
            photoBorderColor: "#black"
          },
          orange: {
              wrapperBackground: "orange",
              headerBackground: "orange",
              headerColor: "white",
              photoBorderColor: "#FEE24C"
            },
          blue: {
            wrapperBackground: "blue",
            headerBackground: "#26175A",
            headerColor: "white",
            photoBorderColor: "#73448C"
          },
         
          grey: {
            wrapperBackground: "grey",
            headerBackground: "grey",
            headerColor: "white",
            photoBorderColor: "white"
          }
        
      }
 
     
 
        pdf.create(html, options).toFile('./profile.pdf', function(err, res) {
         if (err) return console.log(err);
         console.log(res); // { filename: '/app/businesscard.pdf' }
       });
       })
       
       
       console.log(userInfo, res.data)

       
       

     //  let user = generateHTML(userInfo)

    //    var pdf = {
    //        html: user,
    //        data: userInfo,
    //        path: "./profile.pdf"
    //    };

    //    var options = {
    //     format: "A3",
    //     orientation: "portrait",
    //     border: "10mm",
    // }

    //    pdf.create(document, options)
    // .then(res => {
    //   console.log('Successfully created pdf!');
    //     console.log(res);
    })
    
})


