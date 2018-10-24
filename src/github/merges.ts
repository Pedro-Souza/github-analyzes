import axiosConfig from '../auth/auth';

let infosRepos: any = {}

const teste = (repos: string, pulls: any) => {
    if(pulls.headers['link']) {
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
    })).then(() => { return infosRepos })
       .catch(err => { return `Houve algum error ${err}` });
    return infosRepos
}

export default getMerges;