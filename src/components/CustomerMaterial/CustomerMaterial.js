import {makeStyles} from "@material-ui/core";

export const useTableStyles = makeStyles({

    tableContainer: {
      overflowX:"auto"
    },
    TableRow: {
        fontWeight:"bold"
    },
    tableCell: {
        fontSize: '16px',

    },
    imageCell: {
        maxWidth: '80px',
        height: "80px",
        padding: '4px'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'auto',
        display: 'block'
    },
    iconButton: {
        marginRight: '8px'
    },
    oddRow: {
        backgroundColor: '#f5f5f5'
    },
    evenRow: {
        backgroundColor: 'white'
    }
});
export const useDialogStyles = makeStyles((theme) => ({
    dialogTitle: {
        fontSize: '18px',
    },
    dialogContext:{
        fontSize:"18px"
    }
}));