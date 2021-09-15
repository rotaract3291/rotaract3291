import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PARTICIPATIONS_API } from '../../components/urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { Account } from '../../components/Account';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function Index() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(PARTICIPATIONS_API + '/participations');
        axios.get(PARTICIPATIONS_API + '/participations')
            .then(x => {
                    //debugger;
                    for(let i = 0; i < x.data.length ; i++) {
                        users.push(x.data[i])
                    }
                    setLoading(false)
                }
            );
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    
    const classes = useStyles();

    return (
    <Account>
        <div>
            <NavbarAdmin />
            <br />
            <br />
                <Link href='/participations/add'>
                    <button class="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded">
                        Add Participation
                    </button>
                </Link>
            <br />
            <br />
            {
                (loading) ? '' :
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Organiser</TableCell>
                            <TableCell align="right">Project Name</TableCell>
                            <TableCell align="right">RID</TableCell>
                            <TableCell align="right">No. of Members</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.id}
                                </TableCell>
                                <TableCell align="right">{row.organisers}</TableCell>
                                <TableCell align="right">{row.project_name}</TableCell>
                                <TableCell align="right">{row.rid}</TableCell>
                                <TableCell align="right">{row.members}</TableCell>
                                <TableCell align="right">
                                    <Link href={`/participations/edit/${encodeURIComponent(row.id)}`}>
                                        <a><EditIcon /></a>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    </Account>
  );
}



