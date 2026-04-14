package com.blind.social.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.blind.social.data.KimlikDeposu
import kotlinx.coroutines.launch
import androidx.activity.compose.BackHandler
import android.app.Activity
import androidx.compose.ui.platform.LocalContext
import com.blind.social.ui.theme.WhatsAppGreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainShell(
    onLogoutSuccess: () -> Unit,
    isDarkMode: Boolean,
    onToggleTheme: (Boolean) -> Unit,
    isDesign2: Boolean,
    onToggleDesign2: (Boolean) -> Unit
) {
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val coroutineScope = rememberCoroutineScope()
    val kimlikDeposu = remember { KimlikDeposu() }

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "messages"

    val context = LocalContext.current
    var showExitDialog by remember { mutableStateOf(false) }

    BackHandler(enabled = currentRoute == "messages") {
        showExitDialog = true
    }

    if (showExitDialog) {
        AlertDialog(
            onDismissRequest = { showExitDialog = false },
            title = { Text("Çıkış") },
            text = { Text("Uygulamadan çıkmak istediğinize emin misiniz?") },
            confirmButton = {
                Button(onClick = {
                    showExitDialog = false
                    (context as? Activity)?.finish()
                }, colors = ButtonDefaults.buttonColors(containerColor = WhatsAppGreen)) {
                    Text("Evet")
                }
            },
            dismissButton = {
                TextButton(onClick = { showExitDialog = false }, colors = ButtonDefaults.textButtonColors(contentColor = WhatsAppGreen)) {
                    Text("Hayır")
                }
            }
        )
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                Text("WhatsApp Clone", modifier = Modifier.padding(16.dp), style = MaterialTheme.typography.titleLarge, color = WhatsAppGreen)
                HorizontalDivider()

                NavigationDrawerItem(
                    label = { Text("Ayarlar") },
                    selected = currentRoute == "privacy",
                    onClick = {
                        navController.navigate("privacy")
                        coroutineScope.launch { drawerState.close() }
                    },
                    icon = { Icon(Icons.Default.Settings, contentDescription = "Ayarlar") },
                    modifier = Modifier.semantics { contentDescription = "Ayarlar için çift dokunun" }
                )

                NavigationDrawerItem(
                    label = { Text("Çıkış Yap") },
                    selected = false,
                    onClick = {
                        coroutineScope.launch {
                            val result = kimlikDeposu.oturumKapat()
                            if (result.isSuccess) {
                                onLogoutSuccess()
                            }
                            drawerState.close()
                        }
                    },
                    icon = { Icon(Icons.Default.ExitToApp, contentDescription = "Çıkış Yap") },
                    modifier = Modifier.semantics { contentDescription = "Oturumu kapatmak için çift dokunun" }
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                if (!currentRoute.startsWith("chat")) {
                    TopAppBar(
                        title = { Text("WhatsApp", color = Color.White) },
                        navigationIcon = {
                            IconButton(
                                onClick = { coroutineScope.launch { drawerState.open() } },
                                modifier = Modifier.semantics { contentDescription = "Yan menüyü açmak için çift dokunun" }
                            ) {
                                Icon(Icons.Default.Menu, contentDescription = "Menüyü Aç", tint = Color.White)
                            }
                        },
                        actions = {
                            IconButton(onClick = { /*TODO*/ }) {
                                Icon(Icons.Default.Search, contentDescription = "Ara", tint = Color.White)
                            }
                            IconButton(onClick = { /*TODO*/ }) {
                                Icon(Icons.Default.MoreVert, contentDescription = "Diğer seçenekler", tint = Color.White)
                            }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(
                            containerColor = WhatsAppGreen,
                            titleContentColor = Color.White
                        )
                    )
                }
            },
            bottomBar = {
                if (!currentRoute.startsWith("chat")) {
                    val items = listOf(
                        BottomNavItem("messages", "Sohbetler", Icons.Default.Chat, "Sohbetlere gitmek için çift dokunun"),
                        BottomNavItem("home", "Güncellemeler", Icons.Default.DonutLarge, "Güncellemelere gitmek için çift dokunun"),
                        BottomNavItem("rooms", "Aramalar", Icons.Default.Call, "Aramalara gitmek için çift dokunun"),
                        BottomNavItem("profile", "Ayarlar", Icons.Default.Settings, "Ayarlara gitmek için çift dokunun")
                    )
                    NavigationBar(
                        containerColor = MaterialTheme.colorScheme.surface,
                        contentColor = MaterialTheme.colorScheme.onSurface
                    ) {
                        items.forEach { item ->
                            NavigationBarItem(
                                icon = { Icon(item.icon, contentDescription = item.label) },
                                label = { Text(item.label) },
                                selected = currentRoute == item.route,
                                onClick = {
                                    navController.navigate(item.route) {
                                        popUpTo(navController.graph.startDestinationId) { saveState = true }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = WhatsAppGreen,
                                    selectedTextColor = WhatsAppGreen,
                                    unselectedIconColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                                    unselectedTextColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
                                    indicatorColor = WhatsAppGreen.copy(alpha = 0.1f)
                                ),
                                modifier = Modifier.semantics { contentDescription = item.contentDesc }
                            )
                        }
                    }
                }
            }
        ) { innerPadding ->
            NavHost(
                navController = navController,
                startDestination = "messages",
                modifier = Modifier.padding(innerPadding)
            ) {
                composable("home") { HomeScreen() }
                composable("rooms") {
                    RoomsScreen(onNavigateToChat = { roomId, roomName, creatorId ->
                        val safeCreatorId = creatorId?.toString() ?: "null"
                        navController.navigate("chat/$roomId/$roomName?creatorId=$safeCreatorId")
                    })
                }
                composable("messages") { MessagesScreen() }
                composable("profile") { ProfileScreen() }
                composable("privacy") {
                    SettingsScreen(
                        isDesign2 = isDesign2,
                        onToggleDesign2 = onToggleDesign2,
                        isDarkMode = isDarkMode,
                        onToggleTheme = onToggleTheme
                    )
                }
                composable("about") { AboutScreen() }

                composable(
                    route = "chat/{roomId}/{roomName}?creatorId={creatorId}",
                    arguments = listOf(
                        navArgument("roomId") { type = NavType.StringType },
                        navArgument("roomName") { type = NavType.StringType },
                        navArgument("creatorId") {
                            type = NavType.StringType
                            nullable = true
                            defaultValue = "null"
                        }
                    )
                ) { backStackEntry ->
                    val roomId = backStackEntry.arguments?.getString("roomId") ?: ""
                    val encodedName = backStackEntry.arguments?.getString("roomName") ?: ""
                    val roomName = java.net.URLDecoder.decode(encodedName, "UTF-8")
                    val rawCreatorId = backStackEntry.arguments?.getString("creatorId")
                    val creatorId = if (rawCreatorId == "null" || rawCreatorId == null) null else rawCreatorId

                    ChatScreen(
                        roomId = roomId,
                        roomName = roomName,
                        creatorId = creatorId,
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
            }
        }
    }
}

data class BottomNavItem(val route: String, val label: String, val icon: androidx.compose.ui.graphics.vector.ImageVector, val contentDesc: String)