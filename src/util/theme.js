export default {
    palette: {
      primary: {
        main: '#37474f',
      },
      secondary: {
        main: '#18ffff',
      },
    },
    spreadThis: {
      typography:{
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
      },
      image: {
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 20px auto'
      },
      textField: {
          margin: '10px auto 20px auto'
      },
      button:{
          marginTop: '20px',
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem',
          marginTop: '10px'
      },
      progress: {
          position: 'absolute'
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#37474f'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    }
    
  }