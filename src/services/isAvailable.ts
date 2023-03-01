
const isAvailable = (data: any, condition: number) => {
    return data.some((element: any) => element.seriesIndex === condition)
}

export default isAvailable;