

const cardData = (params: any, cond1: string, cond2: string) => {
    let leftBar: number = 0;
    let rightBar: number = 0;


    params.filter((item: any) => item.name.includes(cond1))
        .forEach((element: any) => {
            leftBar += element.value
        });

    params.filter((item: any) => item.name.includes(cond2))
        .forEach((element: any) => {
            rightBar += element.value
        });

    let percent: number = Math.round((leftBar / (leftBar + rightBar)) * 100) 

    return {
        leftBar,
        rightBar,
        percent
    }
};

export default cardData;