#
# Shared settings for Firejail non-HTTP(S) URL handler scripts
#

# shellcheck disable=SC2034

### vars

#######################################
## IMPORTANT: use full paths in the variables below
#######################################

# bittorrent client watch dir for .torrent files
_download_dir="${HOME}/Downloads"

## dropzone location where the URL data will be saved temporarily
#+ IMPORTANT: this needs to be read/write accessible in the sandbox
#+ ~/Downloads can be assumed to be a supported location
_drop_dir="${HOME}/Downloads/.firejail-dropzone"


### protocol handlers
#+ bittorrent
_drop_file_bt="${_drop_dir}/bittorrent.drop"
_media_dl_mode="local"
_rpc_bin="/usr/local/bin/transmission-remote"
_rpc_port_local="9091"
_rpc_port_tunnel="9999"
_sshfs_mountpoint="/mnt/sshfs-remote"
_systemd_service="transmission-daemon"

#+ youtube
_drop_file_yt="${_drop_dir}/youtube.drop"
_media_player_bin="/usr/local/bin/mpv"
