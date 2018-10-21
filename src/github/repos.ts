import axiosConfig from '../auth/auth';
import getMerges from './merges'; 

async function getRepos(user: string) {
    let repositoris: Array<string> = [];
    return await axiosConfig.get(`https://api.github.com/users/${user}/repos`).then(repos => {
        //let repositoris: any = []
        let data: Array<any> = repos.data;
        data.forEach(item => {
            getMerges(user, item.name);
            repositoris.push(item.url)
        });
        return repositoris;
    }).catch(error => {
        console.log('NO error?')
        return error.response.status
    });
}
export default getRepos;

