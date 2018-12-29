// import React, { Component } from "react";
// import PopupDialog, {
//   SlideAnimation,
//   DialogTitle,
//   DialogButton
// } from 'react-native-popup-dialog';
// import { View, Text } from 'react-native';

// const slideAnimation = new SlideAnimation({
//   toValue: 0,
//   slideFrom: 'bottom',
//   useNativeDriver: true,
// });

// export default class AlertDialog extends Component {
 
//   constructor(props) {
//     super(props);

//     this.state = {
//       title: this.props.title,
//       description: this.props.description,
//       width: this.props.width,
//       height: this.props.height,
//       show : this.props.show
//     };
//   }

//    componentDidMount() {
//      this.popupDialog.show();
//      console.log("componentDidMount AlertDialog is run ...");
//    }

//   render() {
//     return (
//       <View>
//         <PopupDialog
//           // https://www.npmjs.com/package/react-native-popup-dialog
//           ref={(popupDialog) => {
//             this.popupDialog = popupDialog;
//           }}
//           dialogAnimation={slideAnimation}
//           dialogTitle={<DialogTitle
//             title={this.state.title}
//             titleStyle={{ }}
//             titleTextStyle={{
//               fontFamily: 'IRANSansMobile',
//               fontSize: 20,
//             }}
//             titleAlign='right'
//             hasTitleBar={true}
//           />}
//           width={this.state.width}
//           height={this.state.height}
//           dialogStyle={{ justifyContent: 'center', alignItems: 'center' }}
//           containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//           animationDuration={300}
//           overlayBackgroundColor='#bdc3c7'
//           dismissOnTouchOutside={true}
//           dismissOnHardwareBackPress={true}
//           show={this.state.show}
//         >
//           <View>
//             <Text>{ this.state.description }</Text>
//             <DialogButton text='خب' onPress={ ()=> this.popupDialog.hide() }/>
//           </View>
//         </PopupDialog>
//       </View>
//     );
//   }
// }


import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation,
} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
});

export default class App extends Component {
  state = {
    dialogShow: false,
  };

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  showSlideAnimationDialog = () => {
    this.slideAnimationDialog.show();
  }

  showFadeAnimationDialog = () => {
    this.fadeAnimationDialog.show();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <DialogButton
            text="Show Dialog - Default Animation"
            onPress={this.showFadeAnimationDialog}
          />

          <DialogButton
            text="Show Dialog - Scale Animation"
            onPress={this.showScaleAnimationDialog}
          />

          <DialogButton
            text="Show Dialog - Slide Animation"
            onPress={this.showSlideAnimationDialog}
          />
        </View>

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
        >
          <View style={styles.dialogContentView}>
            <DialogButton
              text="Show Dialog - Default Animation"
              onPress={this.showFadeAnimationDialog}
            />
          </View>
        </PopupDialog>

        <PopupDialog
          dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
          ref={(popupDialog) => {
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView}>
            <Text>Slide Animation</Text>
          </View>
        </PopupDialog>

        <PopupDialog
          ref={(fadeAnimationDialog) => {
            this.fadeAnimationDialog = fadeAnimationDialog;
          }}
          dialogTitle={<DialogTitle title="Popup Dialog - Default Animation" />}
        >
          <View style={styles.dialogContentView}>
            <Text>Default Animation</Text>
          </View>
        </PopupDialog>
      </View>
    );
  }
}
