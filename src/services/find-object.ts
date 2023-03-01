
const findObjectForCard = (data: any, cond: number) => {
    return data.find((element: any) => element.seriesIndex === cond )
}

export default findObjectForCard;