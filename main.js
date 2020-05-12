let puppeteer=require("puppeteer");
let fs=require("fs");
let searchePage=process.argv[3];
let numPosts=Number(process.argv[4]);
let metafile=process.argv[2];

// console.log(searchePage);
// console.log(numPosts);

(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--incognito","--start-maximized"]
    
    })
    let pages=await browser.pages();

    let page=pages[0];
    //await page.goto("https://www.instagram.com/?hl=en",{ waitUntil: "networkidle2" });
    let data=await fs.promises.readFile(metafile);
                data=JSON.parse(data);
    let username=data.username;
    let pwd=data.pwd;
    let url=data.url;
    // console.log(username);
    // console.log(pwd);
    // console.log(url);
    await page.goto(url,{ waitUntil: "networkidle2" });
    await page.waitForSelector("input[name=username]");

    await page.type("input[name=username]",username,{delay:120});
    await page.type("input[name=password]",pwd,{delay:120});

    await Promise.all([
        page.click(".sqdOP.L3NKy.y3zKF"),
        page.waitForNavigation({waitUntil:"networkidle2"})
    ]
    )
    await page.waitForSelector(".LWmhU._0aCwM input");
    await page.type(".LWmhU._0aCwM input",searchePage);
    // await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter');
//fuqBx
//yCE8d  JvDyy
//########Searching the page#################
//await page.waitForNavigation({waitUntil:"networkidle2"});
 await page.waitForSelector("div .fuqBx");
 let searchResults=await page.$$("div .fuqBx a");
 //console.log("searches=>>"+searchResults.length);

// //########click on page link#############
await Promise.all([
    searchResults[0].click("div .fuqBx a"),
    page.waitForNavigation({waitUntil:"networkidle2"})
]
)

await page.waitForSelector(".Nnq7C.weEfm");
//class="Nnq7C weEfm"
//v1Nh3 kIKUG  _bz0w
let posts=await page.$$(".Nnq7C.weEfm div a");
let post=posts[0];
    await Promise.all([
        await post.click(),
        page.waitForNavigation({waitUntil:"networkidle2"})
    ]
    )
let i=0;
do{
    
    await page.waitForSelector(".fr66n button")
   
        await page.click(".fr66n button");
        
    await Promise.all([
        page.click("._65Bje.coreSpriteRightPaginationArrow"),
        page.waitForNavigation({waitUntil:"networkidle2"})
    ]
    )
    i++;
    console.log((i+1)+"Post liked");
    //class=" _65Bje  coreSpriteRightPaginationArrow"

}while(i<numPosts)
//wpO6b 
//aria-label="Like"
//aria-label="Close"
//console.log(posts.length);

    
})();