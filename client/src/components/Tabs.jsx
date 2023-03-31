import { TABS } from "../redux/actions/type";
import { useDispatch } from "react-redux";
import { toggleTab } from "../redux/actions";

export default function Tabs(props) {
    const dispatch = useDispatch();
  return (
    TABS.map(tab=>(
        <button className={tab === props.currentTab ? 'button selected' : 'button'} onClick={()=>dispatch(toggleTab(tab))}>
            {tab}
        </button>
    ))
  )
}
