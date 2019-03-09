import React from "react";


import {Area, AreaChart, Line, LineChart, ResponsiveContainer} from "recharts";

import ChartCard from "./ChartCard";
import Portfolio from "./Portfolio";
import BalanceHistory from "./BalanceHistory";
import SendMoney from "./SendMoney";
import RewardCard from "./RewardCard";
import CurrencyCalculator from "./CurrencyCalculator";
import CryptoNews from "./CryptoNews";
import DownloadMobileApps from "./DownloadMobileApps";
import OrderHistory from "./OrderHistory";
import {increamentData, lineData} from "../Listing/mdata";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

const Crypto = ({match}) => {
  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">

      <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.crypto"/>}/>

      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
          <ChartCard prize="$9,626" title="23" icon="bitcoin"
                     children={<ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%"
                                                    height={75}>
                       <AreaChart data={increamentData}
                                  margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                         <defs>
                           <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                             <stop offset="5%" stopColor="#3f51b5" stopOpacity={1}/>
                             <stop offset="95%" stopColor="#1fb6fc" stopOpacity={1}/>
                           </linearGradient>
                         </defs>
                         <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#4D95F3'
                               fill="url(#color3)"
                               fillOpacity={1}/>
                       </AreaChart>
                     </ResponsiveContainer>}
                     styleName="up" desc="Bitcoin Price"/>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
          <ChartCard prize="$7,831" title="07" icon="etherium"
                     children={<ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%"
                                                    height={75}>
                       <AreaChart data={increamentData}
                                  margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                         <defs>
                           <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                             <stop offset="5%" stopColor="#aa3c6d" stopOpacity={1}/>
                             <stop offset="95%" stopColor="#ff9800" stopOpacity={1}/>
                           </linearGradient>
                         </defs>
                         <Area dataKey='pv' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                               fill="url(#color4)"
                               fillOpacity={1}/>
                       </AreaChart>
                     </ResponsiveContainer>}
                     styleName="up" desc="Etherium Price"/>
        </div>
        
        <div className="col-xl-6 col-lg-6 col-md-12 col-12">
          <Portfolio/>
        </div>
   
      </div>

    </div>
  );
};

export default Crypto;
