# Custom Alerts & Updated Auth Flow

## What Was Implemented

### 1. Custom Alert Component
Created a beautiful, animated alert component that replaces React Native's default `Alert.alert`:

**Features:**
- ✅ Smooth spring animations with scale and fade effects
- ✅ Custom themes for different alert types (success, error, warning, info)
- ✅ Gradient icon containers
- ✅ Support for multiple buttons
- ✅ Backdrop blur effect
- ✅ Auto-adapts to light/dark theme
- ✅ Touch outside to dismiss

**Alert Types:**
- `success` - Green gradient with checkmark ✓
- `error` - Red gradient with X mark ✕
- `warning` - Orange gradient with warning symbol ⚠
- `info` - Primary color gradient with info symbol i

**Files Created:**
- `src/components/CustomAlert.js` - Main alert component
- `src/hooks/useAlert.js` - Hook for easy alert usage

### 2. Updated Authentication Flow

#### Auto-Login After Signup
Users are now automatically signed in after creating an account:
1. User fills signup form
2. Account is created in Supabase
3. User is automatically logged in (no email verification required)
4. Success alert shows and user is taken to Home screen

#### All Alerts Replaced
Replaced all `Alert.alert` calls with custom alerts in:
- ✅ SignupScreen
- ✅ LoginScreen
- ✅ HomeScreen

## Disable Email Confirmation in Supabase

**IMPORTANT:** You need to disable email confirmation in Supabase Dashboard:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **brainbatu**
3. Navigate to **Authentication** → **Providers** (left sidebar)
4. Click on **Email** provider
5. Scroll down to find **"Confirm email"** toggle
6. **Disable** the "Confirm email" option
7. Click **Save**

**Why this is needed:**
- Allows users to login immediately after signup
- Users won't need to verify email before accessing the app
- Email verification can still be checked later for restrictions

## How to Use Custom Alerts

### Basic Usage

```javascript
import { useAlert } from '../hooks/useAlert';
import CustomAlert from '../components/CustomAlert';

function MyScreen() {
  const { alertState, showAlert, hideAlert } = useAlert();

  const handleAction = () => {
    showAlert(
      'Alert Title',           // Title
      'Alert message here',    // Message
      [                        // Buttons array
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK pressed') }
      ],
      'success'                // Type: 'success', 'error', 'warning', 'info'
    );
  };

  return (
    <View>
      {/* Your UI */}

      <CustomAlert
        visible={alertState.visible}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        buttons={alertState.buttons}
        onDismiss={hideAlert}
      />
    </View>
  );
}
```

### Button Styles

```javascript
// Primary button (gradient)
{ text: 'Confirm', onPress: () => {} }

// Cancel button (outline)
{ text: 'Cancel', style: 'cancel' }

// Destructive button (red outline)
{ text: 'Delete', style: 'destructive', onPress: () => {} }
```

### Examples

#### Success Alert
```javascript
showAlert(
  'Success!',
  'Your account has been created.',
  [{ text: 'Get Started' }],
  'success'
);
```

#### Error Alert
```javascript
showAlert(
  'Login Failed',
  'Invalid email or password.',
  [{ text: 'Try Again' }],
  'error'
);
```

#### Warning Alert with Multiple Buttons
```javascript
showAlert(
  'Delete Account',
  'This action cannot be undone.',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: handleDelete }
  ],
  'warning'
);
```

#### Info Alert
```javascript
showAlert(
  'New Feature',
  'Check out the new leaderboard!',
  [{ text: 'View Now', onPress: () => navigate('Leaderboard') }],
  'info'
);
```

## Updated Screen Behaviors

### SignupScreen
- Validates all fields before submission
- Shows custom warning alert if form is incomplete
- Creates account and auto-logs in user
- Shows success alert with "Start Playing" button
- On success, navigates to Home screen
- Shows error alert if signup fails

### LoginScreen
- Validates email and password fields
- Shows custom warning alert if fields are empty
- Shows error alert with friendly message if login fails
- Password reset flow uses custom alerts
- Confirms before sending reset email

### HomeScreen
- Shows custom warning alert when signing out
- Confirms user action before sign out
- Shows error alert if sign out fails
- Displays user profile with stats

## Animation Details

The custom alert uses:
- **Spring animation** for scale effect (bouncy entrance)
- **Timing animation** for opacity fade
- **Transform animations** for translateY (slides up slightly)
- Duration: 200ms entrance, 150ms exit

## Theme Integration

The alert automatically adapts to:
- Current theme (light/dark mode)
- App color scheme (COLORS from theme context)
- Shadows and gradients match the app design

## Next Steps

1. **Disable email confirmation** in Supabase Dashboard (follow steps above)
2. **Test the new flow**:
   - Sign up a new user → should auto-login and show success alert
   - Try logging in → should show alerts on errors
   - Test sign out → should show confirmation alert
3. **Add email verification badge** (optional):
   - Show a badge/indicator for unverified users
   - Add a "Verify Email" button in profile/settings
4. **Implement restrictions** for unverified users:
   - Limit certain features
   - Show reminder alerts
   - Add verification flow

## Troubleshooting

### Alerts not showing?
- Make sure `CustomAlert` component is added to your JSX
- Check that `visible={alertState.visible}` is set correctly
- Verify `useAlert` hook is imported and used

### Signup still requires email verification?
- Check Supabase Dashboard settings (Authentication → Providers → Email)
- Make sure "Confirm email" is disabled
- Clear browser cache and test again

### Animations not smooth?
- Ensure `useNativeDriver: true` is set in Animated calls
- Check that device/emulator has good performance
- Reduce animation duration if needed

## Files Modified

- `src/screens/SignupScreen.js` - Updated signup flow and alerts
- `src/screens/LoginScreen.js` - Replaced all alerts with custom ones
- `src/screens/HomeScreen.js` - Added custom alert for sign out

## Files Created

- `src/components/CustomAlert.js` - Main custom alert component
- `src/hooks/useAlert.js` - Hook for managing alert state
- `CUSTOM_ALERTS_SETUP.md` - This documentation file
