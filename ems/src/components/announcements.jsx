import { Card, CardContent, CardMedia, Typography, Box, Avatar, Stack, Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Announcements = ({ allAnnouncements }) => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Announcements
          </Typography>

          {allAnnouncements.map((announcement, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                {/* User Info */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={announcement.posterImage} alt="User" sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {announcement.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {announcement.time} • {announcement.date}
                    </Typography>
                  </Box>
                </Stack>

                {/* Announcement Content */}
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {announcement.content}
                </Typography>

                {/* Posted Image */}
                {announcement.postedImage && (
                  <CardMedia
                    component="img"
                    image={announcement.postedImage}
                    alt="Announcement"
                    sx={{ mt: 2, borderRadius: 2, width: "100%", maxHeight: 500, objectFit: "contain" }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Announcements;
