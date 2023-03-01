interface dataObject {
    period: string,
    name: string,
    value: number,
}


const filterData = (data: dataObject[], condition: string) => {
    return data.filter(item => {
        if (item.name === condition) return item.value;
    })
};

export default filterData;