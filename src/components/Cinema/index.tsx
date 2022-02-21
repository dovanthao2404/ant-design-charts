import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import api from '../../services/baseApiServices';
import "./style.scss";
export default function Cinema(props: any) {

    if (!props.data) { return <>loading</>; }


    const dataTemp = props?.data.content.map((item: any, index: any) => {
        return { type: item.maHeThongRap, value: item.lstCumRap.length };
    });

    const config = {
        appendPadding: 10,
        data: dataTemp,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: (data: any): any => `${(data.percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    } as any;

    return (
        <div className='item'>
            <p >Total cinema {dataTemp.reduce((total: number, item: { type: string, value: number; }) => (total += item.value), 0)}</p>
            <Pie {...config} />
        </div>
    );
}
