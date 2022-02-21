import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import api from '../../services/baseApiServices';

export default function Movie(props: any) {
    if (!props.data) return <></>;
    const dataTemp = props?.data?.content.map((item: any, index: any) => {
        const value = item.lstCumRap.reduce((total: number, item: any) => {
            return total + item.danhSachPhim.length;
        }, 0);
        return { type: item.maHeThongRap, value };
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
            content: (data: any): any => {
                return `${(data.percent * 100).toFixed(0)}%`;
            },
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
    if (!dataTemp) { return <>loading</>; }

    return (
        <div className='item'>
            <p >Total movie {dataTemp.reduce((total: number, item: { type: string, value: number; }) => (total += item.value), 0)}</p>
            <Pie {...config} />
        </div>
    );
}
