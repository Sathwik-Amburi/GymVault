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
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CourseSession } from "../models/allModels";
import moment from "moment";

const Row = (props: {
  row: CourseSession;
  selected?: string;
  setSelected?: (id: string) => void;
  showNextSessionDate?: boolean;
}) => {
  const { row, selected, setSelected, showNextSessionDate } = props;
  const [open, setOpen] = useState(false);

  // credit: https://stackoverflow.com/questions/34979051/find-next-instance-of-a-given-weekday-ie-monday-with-moment-js
  function getNextWeekday(day: string): string {
    var weekDayToFind = moment().day(day).weekday(); //change to searched day name
    var searchDate = moment(); //now or change to any date
    while (searchDate.weekday() !== weekDayToFind) {
      searchDate.add(1, "day");
    }

    return searchDate.format("DD/MM/YYYY");
  }

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
          {showNextSessionDate && <span>Next </span>}
          {row.sessionDay}
          {showNextSessionDate && (
            <span> ({getNextWeekday(row.sessionDay)})</span>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {selected !== undefined && <TableCell> </TableCell>}
                    <TableCell>Time</TableCell>
                    <TableCell>Instructor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessionDetails.map((historyRow) => (
                    <TableRow key={historyRow.sessionTime}>
                      {selected !== undefined && (
                        <TableCell>
                          <Radio
                            onChange={() => {
                              if (setSelected !== undefined)
                                setSelected(
                                  "S:" +
                                    row.sessionDay +
                                    historyRow.sessionTime +
                                    historyRow.sessionsInstructor
                                );
                            }}
                            checked={
                              selected ===
                              "S:" +
                                row.sessionDay +
                                historyRow.sessionTime +
                                historyRow.sessionsInstructor
                            }
                          />
                        </TableCell>
                      )}
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
  showNextSessionDate?: boolean;
}

const CourseScheduleTable: FC<CourseScheduleTableProps> = ({
  courseSessions,
  selected,
  setSelected,
  showNextSessionDate,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Weekly Schedule</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseSessions.map((row) => (
            <Row
              key={row.sessionDay}
              row={row}
              selected={selected}
              setSelected={setSelected}
              showNextSessionDate={showNextSessionDate}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseScheduleTable;
