import React, {useEffect} from "react";
import moment from "moment";
import styled from 'styled-components';
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setOrdersMaster} from "../../../../store/actions/orderActions";
import {setUserData} from "../../../../store/actions/userActions";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2fr);
  grid-gap: 2px;
  background-color: #ffffff;
  margin-bottom: 2px;
`;

const CellWrapper = styled.div`
  border-radius: 6px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  min-width: 10%;
  text-align: center;
  background-color: ${props => props.isWeekday ? 'rgba(217,83,79,0.32)' : 'rgba(104,168,158,0.27)'};
  color: ${props => !props.isSelectedMonth ? 'rgba(99,99,99,0.54)' : props.isWeekday ? '#d9534f' : '#000000'};
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;;`

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f7f7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`;


const EventListWrapper = styled('ul')`
  margin: 3% 10%;
`;

const EventItemWrapper = styled('button')`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border: unset;
  background: unset;
  color: #18317d;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Calendar = ({stringDate = '2022-01-12'}) => {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.orders.items)
    const master = useSelector((state) => state.users.data?.master)
    const email = useSelector((state) => state.users.user.email)
    const {page} = useSelector((state) => state.orders)

    const calendar = [[], [], [], [], [], []]
    let today = dayjs(stringDate);
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = today.clone().endOf('month').endOf('week');

    useEffect(() => {
        if (!master?.master_id)
            dispatch(setUserData("masters", email))
        if (orders.length <= 0)
            dispatch(setOrdersMaster(page, master?.master_id))
    }, [dispatch, master, master?.master_id]);

    let day = startDay.clone().subtract(1, 'day');
    let week = 0
    let dayInWeek = 0
    const daysMap = []
    while (day.isBefore(endDay, 'day')) {
        if (dayInWeek === 7) {
            dayInWeek = 0
            week++
        }
        calendar[week].push(
            day.clone().add(1, 'day')
        )
        dayInWeek++
        day = day.add(1, 'day');
        daysMap.push(day)
    }

    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => today.isSame(day, 'month');
    console.log(dayjs(orders[0]?.order_time))
    return (
        <div className="m-2">
            <GridWrapper isHeader>
                {
                    ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"].map((name, i) => (
                        <CellWrapper
                            isWeekday={i === 6 || i === 0}
                            key={i}
                            isSelectedMonth
                            isHeader
                        >
                            <RowInCell justifyContent={'flex-end'} pr={1}>
                                {name}
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>
            <GridWrapper>
                {
                    daysMap.map((dayItem) => (
                        <CellWrapper
                            isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
                            key={dayItem.unix()}
                            isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCell justifyContent={'flex-end'}>
                                <ShowDayWrapper>
                                    <DayWrapper onClick={() => console.log(dayItem)}>
                                        {
                                            isCurrentDay(dayItem) ? (
                                                <CurrentDay>{dayItem.format("D")}</CurrentDay>
                                            ) : (
                                                dayItem.format('D')
                                            )
                                        }
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        orders
                                            .filter(o => dayjs(o.order_time.split('T')[0]).diff(dayItem, 'day') === 0)
                                            .reverse()
                                            .map(o => (
                                                <li key={o.id}>
                                                    {o.order_time.split('T')[1].split(".")[0]}
                                                    <EventItemWrapper onDoubleClick={() => console.log(o.order_id)}>
                                                        Заказ №{o.order_id}
                                                    </EventItemWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }
            </GridWrapper>

        </div>
    );
};

export default Calendar;
