import axiosConfig from '../auth/auth';
import author from './getAuthor'
import formatDate from './formatDate';


let infosRepos: any = {}
let usersPulls: Object = {}
const teste = (repos: string, pulls: any) => {
    //pulls.headers['link']
    if(false) {
        //console.log(repos)
        //console.log('passei aqui');
        //Fazer quando tiver mais de 100.
        //const regex = /&page=(.*?)&per_page/
        //const lul: any = regex.exec(pulls.headers['link'].split(", ")[1]);
    } else {
        let pull: Array<any> = pulls.data;
        let pullsClosed: number = 0;
        let pullsOpen: number = 0;
        if(pull.length == 0) {
            infosRepos[repos] = {status: 'no pull requests'}
            return
        }
        pull.forEach(item => {
            if(item.state == 'open'){
                pullsOpen++
            } else if (item.state == 'closed') {
                author(item, usersPulls);
                pullsClosed++
            }
        });
        infosRepos[repos] = {'open': pullsOpen, 'close': pullsClosed}
    }
}
const getMerges = async (user: string, reposs: Array<any>) => {
    await Promise.all(reposs.map(async repos => {
        await axiosConfig.get(`https://api.github.com/repos/${user}/${repos}/pulls?state=all&page=1&per_page=100`).then(async pulls => {
            await teste(repos, pulls);
        });
    })).then(() => { return usersPulls })
       .catch(err => { return `Houve algum error ${err}` });
       //formatDate(usersPulls);
       //return usersPulls;
    await formatDate(usersPulls).then(result => {
        infosRepos = result;
    }).catch(err => {
        throw err  
    });
    return infosRepos;
}

export default getMerges;