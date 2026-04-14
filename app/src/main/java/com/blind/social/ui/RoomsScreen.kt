package com.blind.social.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blind.social.data.Oda
import com.blind.social.data.OdaDeposu
import kotlinx.coroutines.launch
import com.blind.social.ui.theme.WhatsAppGreen

@Composable
fun RoomsScreen(onNavigateToChat: (String, String, String?) -> Unit) {
    val odaDeposu = remember { OdaDeposu() }
    val coroutineScope = rememberCoroutineScope()
    var rooms by remember { mutableStateOf<List<Oda>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        odaDeposu.odalariGercekZamanliDinle().collect { result ->
            if (result.isSuccess) {
                rooms = result.getOrDefault(emptyList())
            }
            isLoading = false
        }
    }

    Box(modifier = Modifier.fillMaxSize().background(Color.White)) {
        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { }
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(WhatsAppGreen),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Link, contentDescription = "Bağlantı", tint = Color.White)
                }
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    Text("Arama bağlantısı oluştur", fontSize = 16.sp, fontWeight = FontWeight.Medium, color = Color.Black)
                    Text("WhatsApp aramanız için bir bağlantı paylaşın", fontSize = 14.sp, color = Color.Gray)
                }
            }

            Text(
                "En son",
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                color = Color.Gray,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
            )

            if (isLoading && rooms.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = WhatsAppGreen)
                }
            } else {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(rooms) { room ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    room.id?.let { roomId ->
                                        val encodedName = java.net.URLEncoder.encode(room.odaAdi, "UTF-8")
                                        onNavigateToChat(roomId, encodedName, room.kurucuId)
                                    }
                                }
                                .padding(horizontal = 16.dp, vertical = 12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(48.dp)
                                    .clip(CircleShape)
                                    .background(Color.LightGray)
                            )
                            Spacer(modifier = Modifier.width(16.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = room.odaAdi,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = if (room.sifre != null) Color.Red else Color.Black,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(Icons.Default.CallMade, contentDescription = null, tint = WhatsAppGreen, modifier = Modifier.size(14.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "${room.kategori} • ${room.kapasite} Kişi",
                                        fontSize = 14.sp,
                                        color = Color.Gray
                                    )
                                }
                            }
                            Icon(Icons.Default.Videocam, contentDescription = "Görüntülü Arama", tint = WhatsAppGreen)
                        }
                    }
                }
            }
        }

        FloatingActionButton(
            onClick = { },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp),
            containerColor = WhatsAppGreen,
            contentColor = Color.White
        ) {
            Icon(Icons.Default.AddCall, contentDescription = "Yeni Arama")
        }
    }
}
