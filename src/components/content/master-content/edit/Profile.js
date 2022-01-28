import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AddCity from "./AddCity";
import EditProfileMaster from "./EditProfileMaster";
import {deleteMasterCity, setUserData} from "../../../../store/actions/userActions";
import {setCities} from "../../../../store/actions/cityActions";

import {COLLAPSE_ARROWS, EXPAND_ARROWS} from "../../../../utils/svg_constants";

const Profile = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.users.user.email)
    const master = useSelector((state) => state.users.data?.master)
    const deps = useSelector((state) => state.users.data?.deps)
    const cities = useSelector((state) => state.cities.items)
    const [openFilter, setOpenFilter] = useState(false)

    useEffect(() => {
        if (!master?.master_id)
            dispatch(setUserData("masters", email))
        if (cities.length <= 0)
            dispatch(setCities())
    }, [])
    return (
        <div>
            <div className="d-flex">
                <h3 className="text-left mt-5">Привет, {master?.master_name}</h3>
                {master?.email && <EditProfileMaster master={master}/>}
            </div>
            {deps?.length > 0 ?
                <div>
                    <button className="btn mt-4" type="button" data-toggle="collapse"
                            data-target="#Filter" onClick={(e) => {
                        e.preventDefault()
                        setOpenFilter(!openFilter)
                    }}
                            aria-controls="Filter"><span className="font-size:bigger">Ваш список городов: &nbsp;</span>
                        {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
                    </button>
                    {
                        openFilter &&
                        <div id="Filter mt-4">
                            <div className="form-group">
                                <div className="form-group">
                                    <ul className="list-group-row">
                                        {
                                            deps.map((d) => {
                                                return (
                                                    <div key={d}
                                                         className="col-md-4 p-2">
                                                        {cities?.find(c => c.city_id === d)?.city_name}
                                                        <button className="btn"
                                                                onClick={() => dispatch(deleteMasterCity({
                                                                    city_id: d,
                                                                    master_id: master.master_id
                                                                }))}>
                                                            <span>&times;</span>
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <AddCity master={master}/>
                        </div>
                    }
                </div>
                : <div>
                    <h4 className="text-left mt-5">Ваш список городов пуст</h4>
                    <AddCity master={master}/>
                </div>
            }
        </div>
    );
};

export default Profile;
