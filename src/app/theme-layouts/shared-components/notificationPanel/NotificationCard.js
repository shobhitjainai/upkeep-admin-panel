import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { dismissItem } from '../../../store/admin/notificationSlice';
import { useDispatch } from 'react-redux';
function NotificationCard(props) {

  const dispatch = useDispatch();

  const { item, className } = props;
  const variant = item?.variant || '';

  const handleClose = () => {
    dispatch(dismissItem(item._id)); 
  };
  return (
    <Card
      className={clsx(
        'flex flex-col  relative w-full rounded-16 p-20 min-h-64 shadow space-x-8',
        variant === 'success' && 'bg-green-600 text-white',
        variant === 'info' && 'bg-blue-700 text-white',
        variant === 'error' && 'bg-red-600 text-white',
        variant === 'warning' && 'bg-orange-600 text-white',
        className
      )}
      elevation={0}
      component={item.useRouter ? NavLinkAdapter : 'div'}
      to={item.link || ''}
      role={item.link && 'button'}
    >
      
      
      <div className="flex flex-col flex-auto">
      {item.title && (
  
        <Typography sx={{fontWeight:"bold" , color: '#51AB2F !important'}}>
          
          {item.title}
        </Typography>

      )}


        {item.description && (
          <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description}} />
        )}
      
         {item.createdBy ? (
  <Typography sx={{ fontWeight: "bold"}}>
    {item.createdBy.username}
  </Typography>
) : (
  <Typography sx={{ fontWeight: "bold" }}>
    Unknown
  </Typography>
)}


        {item.item && (
          <Typography className="mt-8 text-sm leading-none " color="text.secondary">
            {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
          </Typography>
        )}
      </div>

      <IconButton
        disableRipple
        className="top-0 right-0 absolute p-8"
        color="inherit"
        size="small"
        onClick={()=>handleClose(item._id)}
      >
        <FuseSvgIcon size={12} className="opacity-75" color="inherit">
          heroicons-solid:x
        </FuseSvgIcon>
      </IconButton>
      {item.children}
    </Card>
  );
}

export default NotificationCard;
