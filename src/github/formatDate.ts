const formatDate = async (json: any) => {
    for(let user in await json) {
        json[user].mergeDate.forEach(date => {
            let data: Date = new Date(date);
            let datePull: string = `${data.getMonth() + 1}/${data.getFullYear()}}`
            if(json[user][datePull]) {
                json[user][datePull] += 1;
            } else {
                json[user][datePull] = 1;
            }
        })
    }
    return json;
}

export default formatDate;