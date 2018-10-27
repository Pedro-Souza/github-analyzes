import axiosConfig from '../auth/auth';
import getMerges from './merges'; 

async function getRepos(user: string) {
    let repositoris: Array<string> = [];
    return await axiosConfig.get(`https://api.github.com/users/${user}/repos?visibility=alll&page=1&per_page=100`).then(repos => {
        let data: Array<any> = repos.data;
        data.forEach(item => {
            repositoris.push(item.name)
        });
        return getMerges(user, repositoris).then(item => {
            return item;
        }).catch(err => console.log(err))
    }).catch(error => {
        return error.response.status
    });
}
export default getRepos;

