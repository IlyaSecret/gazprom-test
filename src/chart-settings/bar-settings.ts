import data from "../data";
import cardData from "../services/card-data";
import filterData from "../services/filter-data";
import findObjectForCard from "../services/find-object";
import isAvailable from "../services/isAvailable";


const config = {
    legend: {
        orient: 'horizontal',
        bottom: '20',
        type: 'plain',
        icon: 'circle',
        selected: {
            'В программе ИТ': true,
            'В программе ЦП': true,
            'Вне программ ИТ': true,
            'Вне программ ЦП': true,
        }
    },

    title: {
        text: 'Проекты в программах и вне программ',
        top: 0,
        textStyle: {
            color: '#002033',
            fontWeight: 600,
            fontSize: 16,
        },
        subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
        subtextStyle: {
            color: '#00203399',
            fontWeight: 400,
            fontSize: 14,
        },
    },

    grid: {
        top: '20%',
        left: '6%',
        height: '365px',
    },

    xAxis: {
        data: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        }

    },

    yAxis: {
        type: 'value',

    },


    tooltip: {
        trigger: 'axis',

        formatter: (params: any) => {

            const amountObject = cardData(params, 'В программе', 'Вне программ');
            return `
            <div class='infoCard'>
                <div class='strong title'>${params[0].axisValue} 2022</div>
                <div class='strong'>${amountObject.percent !== 0 ? 'В программе <div class="amount">' + amountObject.percent + '% | ' + amountObject.leftBar + 'шт.</div>' : ''}</div>
                <div class='valueArea'>${isAvailable(params, 0) ? findObjectForCard(params, 0).marker + 'Проекты ИТ' : ''} <div class='strong amount'> ${isAvailable(params, 0) ? findObjectForCard(params, 0).value + ' шт.' : ''}</div></div>
                <div class='valueArea'>${isAvailable(params, 1) ? findObjectForCard(params, 1).marker + 'Проекты ЦП' : ''} <div class='strong amount'> ${isAvailable(params, 1) ? findObjectForCard(params, 1).value + ' шт.' : ''}</div></div>
                
                <div class='strong'>${(100 - amountObject.percent) !== 0 ? 'Вне программ <div class="amount">' + (100 - amountObject.percent) + '% | ' + amountObject.rightBar + 'шт.</div>' : ''}</div>
                <div class='valueArea'>${isAvailable(params, 2) ? findObjectForCard(params, 2).marker + 'Проекты ИТ' : ''} <div class='strong amount'> ${isAvailable(params, 2) ? findObjectForCard(params, 2).value + ' шт.' : ''}</div></div>
                <div class='valueArea'>${isAvailable(params, 3) ? findObjectForCard(params, 3).marker + 'Проекты ЦП' : ''} <div class='strong amount'> ${isAvailable(params, 3) ? findObjectForCard(params, 3).value + ' шт.' : ''}</div></div>
            </div>      
            `;
        },

    },

    series: [
        {
            name: 'В программе ИТ',
            data: filterData(data, 'В программе ИТ'),
            type: 'bar',
            stack: 'x',
            color: '#56B9F2',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;

                    if (!config.legend.selected['В программе ЦП']) {
                        total = params.value
                        return total
                    } else return ''
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        },

        {
            name: 'В программе ЦП',
            data: filterData(data, 'В программе ЦП'),
            type: 'bar',
            stack: 'x',
            color: '#0078D2',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;
                    if (config.legend.selected['В программе ИТ']) {
                        total = params.value + config.series[0].data[params.dataIndex].value
                        return total
                    }
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,

            }
        },

        {
            name: 'Вне программ ИТ',
            data: filterData(data, 'Вне программ ИТ'),
            type: 'bar',
            stack: 'y',
            color: '#22C38E',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;

                    if (!config.legend.selected['Вне программ ЦП']) {
                        total = params.value
                        return total
                    } else return ''
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        },

        {
            name: 'Вне программ ЦП',
            data: filterData(data, 'Вне программ ЦП'),
            type: 'bar',
            stack: 'y',
            color: '#00724C',
            symbolSize: 15,
            label: {
                show: true,
                position: 'top',
                formatter: (params: any) => {
                    let total: number;
                    if (config.legend.selected['Вне программ ИТ']) {
                        total = params.value + config.series[2].data[params.dataIndex].value
                        return total
                    }
                },
                color: '#002033',
                fontWeight: 600,
                lineHeight: 21,
                fontSize: 14,
            }
        }
    ]
};


export default config;