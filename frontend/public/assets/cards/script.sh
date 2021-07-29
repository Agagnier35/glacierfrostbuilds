for f in *.png; do
    mv -- "$f" "${f/_Card.png/.png}"
done