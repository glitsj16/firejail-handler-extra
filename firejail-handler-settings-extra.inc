#
# Shared settings for Firejail non-HTTP(S) URL handler scripts
#

# shellcheck disable=SC2034

### vars

#######################################
## IMPORTANT: use full paths in the variables below
#######################################

# follow XDG specifications and fallback to hardcoded drop dir location
if [ "$(which xdg-user-dir)" ]; then
    _drop_dir="$(which xdg-user-dir DOWNLOAD)"
else
    _xdg_config_home="$(env | grep -c "XDG_CONFIG_HOME")"
    if [ "$_xdg_config_home" = 1 ]; then
	if [ -s "${XDG_CONFIG_HOME}/.config/user-dirs.dirs" ]; then
	    _drop_dir="$(grep "^XDG_DOWNLOAD_DIR=" "${XDG_CONFIG_HOME}/.config/user-dirs.dirs" | awk '{split($0,a,"="); print a[2]}' | sed 's/"//g')"
	fi
    elif [ -s "${HOME}/.config/user-dirs.dirs" ]; then
	_drop_dir="$(grep "^XDG_DOWNLOAD_DIR=" "${HOME}/.config/user-dirs.dirs" | awk '{split($0,a,"="); print a[2]}' | sed 's/"//g')"
    else
	_drop_dir="${HOME}/Downloads"
    fi
fi

# bittorrent client watch dir for .torrent files
_download_dir="$_drop_dir"

## drop dir location where the URL data will be saved temporarily
#+ IMPORTANT: this needs to be read/write accessible in the sandbox
_drop_dir="${_drop_dir}/.firejail-dropzone"

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
