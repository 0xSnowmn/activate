const puppeteer = require("puppeteer-core");
const fs = require("fs");
const chrome = require("chrome-paths");
const path = require("path")
const pg = require("./sc/pg.json").data
const gp = require("./sc/gp.json").data
const isDev = false

module.exports.Init = async function() {
        try {
            const browser = await puppeteer.launch({
                executablePath:chrome.chrome,
                headless: false,
                defaultViewport: null,
                args: ['--no-sandbox', '--start-maximized' ],
                slowMo:25,
            })
            const page = await browser.newPage();
            return page
        } catch (error) {
            console.log(error)
        }
}

module.exports.Start = async function(page,id,user,pass) {
    var data
    await page.setDefaultTimeout(120000);
    await page.setDefaultNavigationTimeout(0)
    await page.goto("https://mbasic.facebook.com") 
    await login(page,user,pass)
    //await page.waitForNavigation()
    if(page.url().indexOf("save-device") > -1 || page.url().indexOf("checkpoint") > -1) {
        console.log("5ra")
        const st = await app(page)
        !fs.existsSync(path.normalize('cookies')) && fs.mkdirSync(path.normalize('cookies'), { recursive: true })
        st.status == 'Work' ?  fs.writeFileSync(path.normalize('cookies/') + user + '.txt', String(st.coo)) : ''
        data = {Id:id + 1 ,user:user,pass:pass,cookie:String(st.coo),status:String(st.status)}
    } else if(page.url().indexOf("email=" + user) > -1 ) {
        console.log("mashy")
        data = {Id:"",user:user,pass:pass,cookie:"",status:""}
    }
    await clearCookies(page)
    return data

}
const app = async (page) => {
        var status = 'Work'
        var coo = ''
        await page.setDefaultTimeout(120000);
        try {
                if(page.url().indexOf("checkpoint") > -1) {
                    status = "Checkpoint"
                    await clearCookies(page)
                } else {
            await page.goto('https://mbasic.facebook.com/language/',{waitUntil:'domcontentloaded'})
            await page.waitForSelector('input[value="English (US)"]')
            await page.click('input[value="English (US)"]')
            await ChangeCoverAndProf(page)
            await post(page)
            await likePosts(page)
            await getlij(page)
            await joinGp(page)
            await createPage(page)
            coo = await saveCookies(page)
            await clearCookies(page)
            }
        } catch (error) {
            console.log(error)
        }
        console.log(status)
        return {status:status,coo:coo}
}

function setPath(filePath) {
    return isDev ? path.join(__dirname,filePath)  : filePath
}

async function login(page,user,pass) {
    await page.waitForSelector("input[name='email']")
    await page.type("input[name='email']",user)
    await page.type("input[name='pass']",pass)
    await page.keyboard.press("Enter")
}
async function ChangeCoverAndProf(page) {
    await page.goto("https://mbasic.facebook.com/photos/upload/?cover_photo",{ waitUntil: 'domcontentloaded' })
    await page.waitForSelector("input[type=file]")    
    const file = await page.$("input[type=file]");
    await file.uploadFile(setPath("sc/a.jpg") );
    await Promise.all([
        page.click('input[value="Upload"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
    await page.goto("https://mbasic.facebook.com/photos/upload/?profile_pic")
    await page.waitForSelector("input[type=file]")    
    const file2 = await page.$("input[type=file]");
    await file2.uploadFile(setPath("sc/prof.jpeg"));
    await Promise.all([
        page.click('input[value="Upload"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ])
    await page.goto("https://mbasic.facebook.com")
}

async function post(page,url="https://mbasic.facebook.com/profile.php?_rdr") {
    const posts = [
        'Hello didn\'t sleep enough yesterday :( ',
        'I love my frindes so much  :) ',
        'Memes make me laugh relly good  ',
        'i think this year will be better  ',
        'i think ronaldo is the best player in the world ',
        'Barcalona is the best team ',
        'karim benzema is the best striker',
        'i think iam need go shopping',
        'i will be marry next month',
        'i love my mom so much',
    ]
    try {
        await page.goto(url)
    await page.waitForSelector('textarea[name="xc_message"]')
    for (let index = 0; index < 3; index++) {
        randomPost = Math.floor(Math.random() * posts.length)
        await page.type('textarea[name="xc_message"]',String(posts[randomPost]))
        await page.click('input[name="view_post"]')
        await page.waitForTimeout(2000)
    }
    } catch (error) {
        console.log(error)
    } 
}

async function likePosts(page) {
    await page.goto("https://m.facebook.com/profile.php?_rdr")
    try {
        await page.waitForXPath('//a[contains(text(), "Like")]',{timeout: 120000})
        lik = await page.$x('//a[contains(text(), "Like")]')
        for (let index = 0; index <= 3; index++) {
            await lik[index].click()
        }
    } catch (error) {
        console.log(error)
    }
}

async function createPage(page) {
    try {
        const nm = Math.floor(Math.random() * 501).toString();
        await page.goto('https://www.facebook.com/pages/creation')
        await (await page.waitForXPath('//span[contains(text(),"Page name (required)")]')).click()
        await page.keyboard.type('test' + nm)
        await (await page.waitForXPath('//span[contains(text(),"Category (required)")]')).click()
        await page.keyboard.type('web')
        await page.waitForSelector("li[id='187393124625179']")
        await page.click('li[id="187393124625179"]')
        await (await page.waitForXPath('//span[contains(text(),"Create Page")]')).click()
        await page.waitForXPath('//body/div[4]/ul/li/div[1]/div')
        const close = await page.$x('//body/div[4]/ul/li/div[1]/div/div[2]')
        await close[0].click()
        await (await page.waitForXPath('//span[contains(text(),"Save")]')).click()
        await page.waitForNavigation()
        await post(page,page.url().replace('www.','mbasic.'))
    } catch (error) {
        console.log("error in create page")
    }

}

async function getlij(page) {      
      try {
        for (let index = 0; index < 5; index++) {
            randomPost = Math.floor(Math.random() * pg.length)
            await page.goto(pg[randomPost].replace('www.','mbasic.'))
            try {
                await page.waitForSelector('[role="presentation"]',{timeout: 120000})
                const bt = await page.$('table[role="presentation"] a span')
                await Promise.all([
                await bt.click(),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ])
            } catch (error) {
                console.log("")
            } 
        }
      } catch (error) {
          console.log(error)
      }
}

async function joinGp(page) {
const joinedGp = []
      try {
        for (let index = 0; index < 5; index++) {
            randomPost = Math.floor(Math.random() * gp.length)
            gpa = gp[randomPost]
            if(joinedGp.includes(gpa)) {
                console.log("")

            } else {
                joinedGp.push(gpa)
                await page.goto(gp[randomPost].replace('www.','mbasic.'))
               try {
                await page.waitForSelector('input[value="Join Group"]',{timeout: 120000})
                await Promise.all([
                    await page.click('input[value="Join Group"]'),
                    await page.waitForTimeout(1500)
                ]) 
               } catch (error) {
                   console.log("")
               }
            }
        }
      } catch (error) {
          console.log(error)
      }
}
const readData = async (file) => {
    var data = []
    file = fs.readFileSync(file,'utf8')
    text = file.split('\n')
    text = text.slice(0,-1)

    text.forEach(el => {
        tx = el.split(':')
        data.push(tx)
    });
    return data
}
const clearCookies = async (page) => {
    try {
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
const acceptBeforeUnload = dialog => 
    dialog.type() === "beforeunload" && dialog.accept()
  ;
try {
    page.once("dialog", acceptBeforeUnload);
  } catch (error) {
      console.log(".")
  }
  await page.goto("https://mbasic.facebook.com")     
    } catch (error) {
        console.log("error in clear cookies")
    }
}

const saveCookies = async (page) => {
    try {
    var data = await page._client.send('Network.getAllCookies');
    var cookies = data['cookies']
    login_cookie =''
    cookie_names = [
      'c_user',
      'sb',
      'datr',
      'fr',
      'spin',
      'xs',
      'wd'
    ]
        for (const key in cookies) {
            const element = cookies[key];
            for (const k in element) {
                cookie_names.forEach(el => {
                if(element[k] == el) {
                  login_cookie += el + '=' + element['value'] + ';'
                 }
              });           
            }
        }
        return login_cookie
    } catch (error) {
        console.log("error in save cookies")
    }
  }