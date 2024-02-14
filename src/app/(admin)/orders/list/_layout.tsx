import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { withLayoutContext } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function OrderListNavigator() {
   return (
      <SafeAreaView
         edges={["top"]}
         style={{ flex: 1, backgroundColor: "white" }}
      >
         <TopTab>
            <TopTab.Screen name="index" options={{ title: "Active" }} />
            <TopTab.Screen name="archive" options={{ title: "Archive" }} />
         </TopTab>
      </SafeAreaView>
   )
}
