#!/bin/sh
rm -f *.jpg
convert -quality 100 -density 600 -verbose -trim  CAH_PortugueseByMarcelo.pdf card.jpg
rm -f card-0.jpg 
mv card-30.jpg terms.jpg
mv card-1.jpg instruction.jpg
ii=0
for i in {25..29}; do
    mv card-$i.jpg qcard-$ii.jpg
    let ii++
done

ii=0
for i in card*.jpg; do
    convert -crop 1195x1195 $i -trim -verbose answer-card-$ii-%d.jpg
    rm $i
    let ii++
done

ii=0
for i in qcard*.jpg; do
    convert -crop 1195x1195 $i -trim -verbose question-card-$ii-%d.jpg
    rm $i
    let ii++
done
