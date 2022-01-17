const puppeteer = require('puppeteer');
const SaveToDB = require('../../database/dataSchema')


// function which returning the data

exports.greet = (req,res)=>{
res.send("hello")
}

const ScrapData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // for overcome the error of timed out
    await page.setDefaultNavigationTimeout(0); 

    // rediercting to the page 
    await page.goto('https://www.coursera.org/professional-certificates/google-project-management#courses');
  

    // click on the button for exractiong all the courses 
    await page.click("#main > div > div:nth-child(5) > div > div > div:nth-child(2) > ul > li > div:nth-child(2) > button > span");

    let data = [];
    let count = 1;

    // fetchin all list of the courses
    while(count <= 6)
    {
        const title = await page.$("#main > div > div:nth-child(2) > div > div > div > div._1b7vhsnq.m-t-2 > div:nth-child(6) > div > div:nth-child("+count+") > div._1tu07i3a > div._16ni8zai.m-b-0")    
        const obj = {
            title : await page.evaluate(el => el.textContent, title),
        }
        data.push(obj)
        count++;
    }
    count = 1;


    while(count < 5)
    {
        const title = await page.$("#main > div > div:nth-child(5) > div > div > div:nth-child(2) > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > a > div > h3")
        const rating = await page.$("#main > div > div:nth-child(5) > div > div > div:nth-child(2) > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > div._1srkxe1s.XDPRating.m-b-2 > div._wmgtrl9.m-r-1s > span > span")
        const discription = await page.$("#main > div > div:nth-child(5) > div > div > div:nth-child(2) > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > div._wmgtrl9 > div > div.content > div.content-inner > p:nth-child(1)")
        // #main > div > div:nth-child(5) > div > div > div:nth-child(2) > div:nth-child(4) > div._1tqo7r77.p-b-3.border-bottom > div._wmgtrl9 > div > div.content > div.overlay
        const obj = {
            title : await page.evaluate(el => el.textContent, title),
            rating : await page.evaluate(el => el.textContent, rating),
            discription : await page.evaluate(el => el.textContent, discription)
        }
        data.push(obj)
        count++;
    }
    count = 1;

    while(count < 3)
    {
        const title = await page.$("#panel-AboutS12nCourseList > div > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > a > div > h3")
        const rating = await page.$("#panel-AboutS12nCourseList > div > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > div._1srkxe1s.XDPRating.m-b-2 > div._wmgtrl9.m-r-1s > span > span")
        const discription = await page.$("#panel-AboutS12nCourseList > div > div:nth-child("+count+") > div._1tqo7r77.p-b-3.border-bottom > div._wmgtrl9 > div > div.content > div.content-inner > p:nth-child(1)")
        
        const obj = {
            title : await page.evaluate(el => el.textContent, title),
            rating : await page.evaluate(el => el.textContent, rating),
            discription : await page.evaluate(el => el.textContent, discription)
        }
        data.push(obj)
        count++;
    }
    
    data.map((data,i)=>{
        if(i>=6)
        {
            const DBdata = SaveToDB({
                title:data.title,
                rating : data.rating,
                discription:data.discription
            })

            DBdata.save().then((data)=>{
                alert("Data Saved")
            }).catch((err)=>{
                alert(err.message);
            })
        }
    })
 
    await browser.close();
    return data;
};

exports.queryData = (req,res) => {
    const rdata = SaveToDB.find( rating = {$gt : 20000, $lt:50000}).then((data)=>{
        console.log("data")
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    })

}

exports.scrapedData = (req,res) => {
    // for over coming the Access - control - allow error
    res.header("Access-Control-Allow-Origin", "*");
    let resdata = ScrapData();
    // console.log(req)


    resdata.then((data)=>{ res.json(data)}).catch((err)=>{res.send( err.message)})

}


