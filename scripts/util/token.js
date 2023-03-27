import axios from 'axios';
import fs from 'fs';

const getToken = async(domain, name, password) => {
    const data = JSON.stringify({"auth":{"identity":{"methods":["password"], "password":{"user":{"domain":{"name":domain}, "name":name, "password":password}}},"scope":{"domain":{},"project":{"name": "ap-southeast-3"}}}})
    axios.post('https://iam.ap-southeast-3.myhuaweicloud.com/v3/auth/tokens', data)
    .then(res => {
        const content = '\nHW_TOKEN=' + res.headers['x-subject-token'] + '\n'
        // const opt = {
        // flag: 'a', // a：追加写入；w：覆盖写入
        // }
        // fs.writeFile('.env', content, opt, (err) => {
        // if (err) {
        //     console.error(err)
        // }
        // })
        return content;
    })
    .catch(error => {
        console.error(error)
    })
};

export { getToken };