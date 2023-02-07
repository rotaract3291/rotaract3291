
import axios from 'axios';
import { AddEdit } from '../../../components/letterhead';
import { LETTERHEAD_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const letterhead = await axios.get(LETTERHEAD_API + '/letterhead/' + params.id);

    console.log(letterhead.data);
    const data = letterhead.data;
    //debugger;

    return {
        props: { data }
    }
}