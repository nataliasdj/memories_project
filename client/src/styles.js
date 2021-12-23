import { makeStyles } from "@material-ui/core/styles";
//make sure to import as named import meaning inside {} instead of default import

//inside makestyle put callback func which immediately returns an object
export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  //basically we saying run the css after this only for devices that are small or smaller than sm
  [theme.breakpoints.down('xs')]: {
    smallContainer: {
      flexDirection:"column-reverse"
    }
  }
  
}));