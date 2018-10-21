import axios from 'axios';

const getRepos = async (user: string) => {
    let repositoris: any = [];
    await axios.get(`https://api.github.com/users/${user}/repos`).then(repos => {
        //let repositoris: any = []
        let data: Array<any> = repos.data;
        data.forEach(item => {
            repositoris.push(item.html_url)
        });
    });
    return repositoris;
}
export default getRepos;