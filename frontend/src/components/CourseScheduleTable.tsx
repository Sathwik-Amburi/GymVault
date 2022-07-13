import {
  Box,
  Collapse,
  IconButton,
  Paper,
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

const Row = (props: { row: CourseSession }) => {
  const { row } = props;
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
              <Typography variant="h6" gutterBottom component="div">
                Sessions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Instructor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessionDetails.map((historyRow) => (
                    <TableRow key={historyRow.sessionTime}>
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
}

const CourseScheduleTable: FC<CourseScheduleTableProps> = ({
  courseSessions,
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
            <Row key={row.sessionDay} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseScheduleTable;
