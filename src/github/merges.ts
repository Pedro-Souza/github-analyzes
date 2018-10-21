import axiosConfig from '../auth/auth';


const getMerges = (user: string, repos: string) => {

    axiosConfig.get(`https://api.github.com/repos/${user}/${repos}/pulls?state=all`).then(pulls => {
        let pull: Array<any> = pulls.data;
        let pullsClosed: number = 0;
        let pullsOpen: number = 0;
        pull.forEach(item => {
            if(item.state == 'open'){
                pullsOpen++
            } else if (item.state == 'closed') {
                pullsClosed++
            }
        });
        console.log(`${repos} - open ${pullsOpen} - closed ${pullsClosed}`);
    })
}

export default getMerges;