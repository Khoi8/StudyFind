# StudyFind
# Release Notes
*Release 1.0*
* New Features:
  * Account features
  * Registration
  * Log in
  * Profile editing
  * Firebase backend
* Study information
  * Filtration
  * Browse studies
  * Sign up

Known Bugs/Missing Features:
* No app icon
* No Paypal integration
	
# Install Guide
**Prerequisites:**
To run our application you will need to install Node.js. Follow the instructions at https://www.npmjs.com/get-npm to install Node.js. Ensure that you add npm to your path on a Windows device. A guide to doing this can be found [here](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10).
Next, install expo in terminal with the command `npm install -g expo-cli`

**Download Instructions:**
To download the project, open terminal and navigate to the folder in which you want to download the project. Enter the command 
`git clone https://github.gatech.edu/brutherford6/StudyFind.git`

Alternatively, you may download a zip of the project [here](https://github.gatech.edu/brutherford6/StudyFind/archive/master.zip).

**Dependent Libraries:**
In order to get the application running, you must get some additional dependencies. These dependencies are React Navigation version 5.x and Firebase. React navigation can be installed with `npm install @react-navigation/native`  and Firebase can be installed with 
`npm install --save firebase`


**Run Instructions (using mobile device):**
To run the application on a mobile device you own, first you need to download the expo mobile app on your device. It is available for both [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) and [iOS](https://search.itunes.apple.com/WebObjects/MZContentLink.woa/wa/link?path=apps%2fexponent). In the terminal, navigate to the project folder and use the command npm start. This should open a tab in your browser with an error readout area and a QR code in the bottom left. Open the expo app on your device and scan the QR code. This will open the app on your device and constantly update it with any edits you make while it is running.

**Run Instructions (IOS):**
In order to run the application on a Mac device, you will need to have at least macOS 10.15.4 on your device. This is required in order to run an emulator using xCode. Then first would be to go to the file directory the application is located in, then running the command `expo start`. This command should open an internet browser, it is the same step as running the app on a mobile device. On the left hand side bar, there will be on option to run the application using an IOS simulator. Before selecting this option, make sure that you have xCode open in the background. All that is left to do is select the “Run IOS Simulator” option, this will automatically open a device using xCode and start your application.

**Troubleshooting:**
If a package is having errors, running `npm install` in the project directory will update packages. Some packages may require manual prerequisite installation, so you will have to look for the names of those in the terminal feed and use the command `npm install package-name@latest` to update the package to the latest version.
