## Global Notification component

This component adds a notification to the whole website, usually to inform
users of some error that's in the process of being fixed.

When necessary, activate the component as follows:

1. update the short and long text in `src/components/GlobalNotification.jsx`
2. add this component to `src/components/Main.jsx`

```
  return (
    <App centered={false} className="app-layout">
      {admin &&
        <AdminLayoutIndicator />}
      <Box>
        <ZooHeader />
        <GlobalNotification />  // ADD HERE
        <AppHeader />
        <AppNotification />
        <Switch>
          ...
        </Switch>
        <ZooFooter />
      </Box>
    </App>
  );
```
