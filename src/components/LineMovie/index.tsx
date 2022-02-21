import moment from 'moment';
import React, { useEffect, useState } from 'react';
import api from '../../services/baseApiServices';
import { Line } from '@ant-design/plots';

export default function LineMovie() {
    const [listDataByDate, setListDataByDate] = useState<any>();
    useEffect(() => {
        (async () => {
            const res = await api.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap");

            const dataTemp = res.data.content.reduce((total: any, item: any) => {

                return [...total, ...item.lstCumRap?.map((item: any) => {
                    return item.danhSachPhim.map((item: any) => item.lstLichChieuTheoPhim.map((item: any) => item));
                })];

            }, []);

            const dataFlat = dataTemp.flat(Infinity);
            const dataByMonth: any = {};

            for (let i = 0; i < dataFlat.length; i++) {
                const dataTimeParent = moment(dataFlat[i].ngayChieuGioChieu).format("YYYY-MM");
                let flag = false;
                let j = 0;

                const keysMonth = Object.keys(dataByMonth);

                for (j = 0; j < keysMonth.length; j++) {
                    const dataTimeChild = keysMonth[j];
                    if (dataTimeChild === dataTimeParent) {
                        flag = true;
                        break;
                    }
                }

                if (flag) {
                    dataByMonth[dataTimeParent].push(dataFlat[i]);
                } else {
                    dataByMonth[dataTimeParent] = [
                        dataFlat[i]];
                }

            }


            const listDataByDate = Object.keys(dataByMonth).map((item: any) => {
                return { Date: item, Showtime: dataByMonth[item].length };
            });
            setListDataByDate(listDataByDate);
        })();
    }, []);
    if (!listDataByDate) { return <>... loading </>; }
    const config = {
        data: listDataByDate,
        xField: 'Date',
        yField: 'Showtime',
        xAxis: {
            tickCount: listDataByDate.length,
        },
        smooth: true,
    };
    return (
        <div style={{
            width: "50%",
            margin: "auto"
        }}>
            <Line {...config} />
            <p style={{ color: "red" }}>Movie showtime chart by month</p>
        </div>
    );
}
