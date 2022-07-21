import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CourseSession } from "../models/allModels";

const Row = (props: { row: CourseSession, selected?: string, setSelected?: (id: string) => void }) => {
  const { row, selected, setSelected } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.sessionDay}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    { selected !== undefined && <TableCell> </TableCell> }
                    <TableCell>Time</TableCell>
                    <TableCell>Instructor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessionDetails.map((historyRow) => (
                    <TableRow key={historyRow.sessionTime}>
                      { selected !== undefined && <TableCell> 
                        <Radio onChange={() => {
                          if(setSelected !== undefined) setSelected(row.sessionDay + historyRow.sessionTime);
                        }} checked={selected === row.sessionDay + historyRow.sessionTime} />
                      </TableCell>}
                      <TableCell component="th" scope="row">
                        {historyRow.sessionTime}
                      </TableCell>
                      <TableCell>{historyRow.sessionsInstructor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

interface CourseScheduleTableProps {
  courseSessions: CourseSession[];
  selected?: string;
  setSelected?: (id: string) => void;
}

const CourseScheduleTable: FC<CourseScheduleTableProps> = ({
  courseSessions, selected, setSelected
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Weekly Schedule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseSessions.map((row) => (
            <Row key={row.sessionDay} row={row} selected={selected} setSelected={setSelected} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseScheduleTable;
