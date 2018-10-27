const author = (json: any, usersPulls: any) => {
    if(json.merged_at != null) {
        if(usersPulls[json.user.login] && usersPulls[json.user.login].qtds) {
            usersPulls[json.user.login].qtds += 1;
            usersPulls[json.user.login].mergeDate.push(json.merged_at);
        } else {
            usersPulls[json.user.login] = {'qtds': 1, 'mergeDate': [json.merged_at]}
        }
    }
}

export default author;