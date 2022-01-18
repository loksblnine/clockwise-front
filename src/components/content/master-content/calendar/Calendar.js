import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../../../../store/actions/userActions";
import ApproveOrderFromCalendar from "./ApproveOrderFromCalendar";
import {instance} from "../../../../http/headerPlaceholder.instance";
import {ACTIONS, DAYS_RUS, MONTH_RUS} from "../../../../utils/constants";
import {Spinner} from "react-bootstrap";
import DayModal from "./DayModal";

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
  text-align: ${props => props.isModal ? "left" : "center"};
  background-color: ${props => props.isWeekday ? 'rgba(217,83,79,0.32)' : 'rgba(104,168,158,0.27)'};
  color: ${props => !props.isSelectedMonth ? 'rgba(99,99,99,0.54)' : props.isWeekday ? '#d9534f' : '#000000'};
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;



const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled('ul')`
  margin: 3% 10%;
`;

const Calendar = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state) => state.orders.calendar)
    const master = useSelector((state) => state.users.data?.master)
    const email = useSelector((state) => state.users.user.email)
    const {isCalendarReady} = useSelector((state) => state.orders)

    const [stringDate, setStringDate] = useState(new Date(new Date().setDate(12)).toString())
    let today = dayjs(stringDate);
    let startDay = today.clone().startOf('month').startOf('week');
    let endDay = today.clone().endOf('month').endOf('week');

    useEffect(() => {
        if (!master?.master_id)
            dispatch(setUserData("masters", email))
        const fetchOrdersForDateRange = async () => {
            return instance({
                url: `/orders/master/${master?.master_id}/calendar?from=${startDay.toDate()}&to=${endDay.toDate()}`,
                method: "get"
            })
        }
        fetchOrdersForDateRange()
            .then(({data}) => {
                dispatch({
                    type: ACTIONS.ORDERS.SET_CALENDAR,
                    payload: data
                })
            })
    }, [dispatch, master, master?.master_id, stringDate, setStringDate]);

    let day = startDay.clone().subtract(1, 'day');

    const daysMap = []
    while (day.isBefore(endDay, 'day')) {
        day = day.add(1, 'day');
        daysMap.push(day)
    }

    const isSelectedMonth = (day) => today.isSame(day, 'month');

    const reduceMonth = () => {
        setStringDate(new Date(new Date(stringDate).setMonth(new Date(stringDate).getMonth() - 1)))
        startDay = today.clone().startOf('month').startOf('week');
        endDay = today.clone().endOf('month').endOf('week');
        dispatch({
            type: ACTIONS.ORDERS.SET_CALENDAR_READY
        })
    }

    const addMonth = () => {
        setStringDate(new Date(new Date(stringDate).setMonth(new Date(stringDate).getMonth() + 1)))
        startDay = today.clone().startOf('month').startOf('week');
        endDay = today.clone().endOf('month').endOf('week');
        dispatch({
            type: ACTIONS.ORDERS.SET_CALENDAR_READY
        })
    }
    if (!isCalendarReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="m-2">
            <div className="row m-2">
                <button className="btn col-sm-1" onClick={reduceMonth}>{"<<"}</button>
                <h3 className="d-flex justify-content-center p-2 col-md-3">{MONTH_RUS[new Date(stringDate).getMonth() + 1]}, {new Date(stringDate).getUTCFullYear()}</h3>
                <button className="btn col-sm-1" onClick={addMonth}>{">>"}</button>
            </div>
            <GridWrapper isHeader>
                {
                    DAYS_RUS.map((name, i) => (
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
                            key={dayItem.unix()} isModal
                            isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCell justifyContent={'flex-end'}>
                                <ShowDayWrapper>
                                    <DayModal dayItem={dayItem}/>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        orders
                                            .filter(o => dayjs(o.order_time.split('T')[0]).diff(dayItem, 'day') === 0)
                                            .reverse()
                                            .map(o => (
                                                <ApproveOrderFromCalendar key={o.order_id} order={o}/>
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
