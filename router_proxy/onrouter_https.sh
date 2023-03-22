#!/bin/sh

# Note your router setup may differ , use only as a guide
LAN_IP=`nvram get lan_ipaddr`
LAN_NET=$LAN_IP/`nvram get lan_netmask`

IIITH_PROXY=10.4.20.103 # IP address of IIIT-H's proxy server

## HTTPS Stuff
PROXY_IP=192.168.1.1 # IP address of machine on which the intermediate transparent https proxy (tproxyhttps) is running (if you are running tproxyhttps on the router itself, then this is the router's ip) 
PROXY_PORT=1125 # Port on which the intermediate transparent http proxy listens for requests
iptables -t nat -A PREROUTING -i br0 -s $LAN_NET -d $LAN_NET -p tcp --dport 443 -j ACCEPT
iptables -t nat -A PREROUTING -i br0 -p tcp --dport 443 -j DNAT --to $PROXY_IP:$PROXY_PORT

# All SNAT Stuff
iptables -t nat -I POSTROUTING -o br0 -s $LAN_NET -d $PROXY_IP -p tcp -j SNAT --to $LAN_IP
iptables -I FORWARD -i br0 -o br0 -s $LAN_NET -d $PROXY_IP -p tcp --dport $PROXY_PORT -j ACCEPT

# Don't route the local network packets through intermediate proxies
iptables -t nat -I PREROUTING -i br0 -d 192.168.36.0/24 -j ACCEPT
iptables -t nat -I PREROUTING -i br0 -d 10.0.0.0/13 -j ACCEPT

# add search domain option for intranet domains
echo "dhcp-option=option:domain-search,iiit.ac.in" >> /tmp/dnsmasq.conf
stopservice dnsmasq
startservice dnsmasq

chmod a+x /tmp/tmpf/tproxyhttps
/tmp/tmpf/tproxyhttps -s $IIITH_PROXY -a 8080 -p $PROXY_PORT -v &> /tmp/tproxyhttps.log &
